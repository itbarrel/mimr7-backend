/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
/* eslint-disable no-prototype-builtins */
/* eslint-disable prefer-rest-params */
/* eslint-disable import/no-extraneous-dependencies */
const inherits = require('inherits')
const { EventEmitter } = require('events')

module.exports = Queue
module.exports.default = Queue

function Queue(options) {
    if (!(this instanceof Queue)) {
        return new Queue(options)
    }

    EventEmitter.call(this)
    options = options || {}
    this.concurrency = options.concurrency || Infinity
    this.timeout = options.timeout || 0
    this.autostart = options.autostart || false
    this.results = options.results || null
    this.pending = 0
    this.session = 0
    this.running = false
    this.jobs = []
    this.timers = {}
}
inherits(Queue, EventEmitter)

const arrayMethods = [
    'pop',
    'shift',
    'indexOf',
    'lastIndexOf',
]

arrayMethods.forEach((method) => {
    Queue.prototype[method] = function () {
        return Array.prototype[method].apply(this.jobs, arguments)
    }
})

Queue.prototype.slice = function (begin, end) {
    this.jobs = this.jobs.slice(begin, end)
    return this
}

Queue.prototype.reverse = function () {
    this.jobs.reverse()
    return this
}

const arrayAddMethods = [
    'push',
    'unshift',
    'splice',
]

arrayAddMethods.forEach((method) => {
    Queue.prototype[method] = function () {
        const methodResult = Array.prototype[method].apply(this.jobs, arguments)
        if (this.autostart) {
            this.start()
        }
        return methodResult
    }
})

Object.defineProperty(Queue.prototype, 'length', {
    get() {
        return this.pending + this.jobs.length
    },
})

Queue.prototype.start = function (cb) {
    if (cb) {
        callOnErrorOrEnd.call(this, cb)
    }

    this.running = true

    if (this.pending >= this.concurrency) {
        return
    }

    if (this.jobs.length === 0) {
        if (this.pending === 0) {
            done.call(this)
        }
        return
    }

    const self = this
    const job = this.jobs.shift()
    let once = true
    const { session } = this
    let timeoutId = null
    let didTimeout = false
    let resultIndex = null
    const timeout = job.hasOwnProperty('timeout') ? job.timeout : this.timeout

    function next(err, result) {
        if (once && self.session === session) {
            once = false
            self.pending--
            if (timeoutId !== null) {
                delete self.timers[timeoutId]
                clearTimeout(timeoutId)
            }

            if (err) {
                self.emit('error', err, job)
            } else if (didTimeout === false) {
                if (resultIndex !== null) {
                    self.results[resultIndex] = Array.prototype.slice.call(arguments, 1)
                }
                self.emit('success', result, job)
            }

            if (self.session === session) {
                if (self.pending === 0 && self.jobs.length === 0) {
                    done.call(self)
                } else if (self.running) {
                    self.start()
                }
            }
        }
    }

    if (timeout) {
        timeoutId = setTimeout(() => {
            didTimeout = true
            if (self.listeners('timeout').length > 0) {
                self.emit('timeout', next, job)
            } else {
                next()
            }
        }, timeout)
        this.timers[timeoutId] = timeoutId
    }

    if (this.results) {
        resultIndex = this.results.length
        this.results[resultIndex] = null
    }

    this.pending++
    self.emit('start', job)
    const promise = job(next)
    if (promise && promise.then && typeof promise.then === 'function') {
        promise.then((result) => next(null, result)).catch((err) => next(err || true))
    }

    if (this.running && this.jobs.length > 0) {
        this.start()
    }
}

Queue.prototype.stop = function () {
    this.running = false
}

Queue.prototype.end = function (err) {
    clearTimers.call(this)
    this.jobs.length = 0
    this.pending = 0
    done.call(this, err)
}

function clearTimers() {
    for (const key in this.timers) {
        const timeoutId = this.timers[key]
        delete this.timers[key]
        clearTimeout(timeoutId)
    }
}

function callOnErrorOrEnd(cb) {
    const self = this
    this.on('error', onerror)
    this.on('end', onend)

    function onerror(err) { self.end(err) }
    function onend(err) {
        self.removeListener('error', onerror)
        self.removeListener('end', onend)
        cb(err, this.results)
    }
}

function done(err) {
    this.session++
    this.running = false
    this.emit('end', err)
}
