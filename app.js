const express = require('express')
const helmet = require('helmet')
// const xss = require('xss-clean');
const compression = require('compression')
const cors = require('cors')
const httpStatus = require('http-status')
const config = require('./config/config')
const morgan = require('./config/morgan')
const authLimiter = require('./src/middlewares/rateLimiter')
const routes = require('./src/routes')
const { errorConverter, errorHandler } = require('./src/middlewares/error')
const ApiError = require('./src/utils/ApiError')
// eslint-disable-next-line no-unused-vars
require('./src/cron-jobs')

const app = express()

if (config.env !== 'test') {
    app.use(morgan.successHandler)
    app.use(morgan.errorHandler)
}
// set security HTTP headers
app.use(helmet())

// parse json request body
app.use(express.json())

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }))

// sanitize request data
// app.use(xss());

// gzip compression
app.use(compression())

// enable cors
app.use(cors())
app.options('*', cors())

// limit repeated failed requests to auth endpoints
if (config.env === 'production') {
    app.use('/v1/auth', authLimiter)
}

// routes
app.use('/', routes)

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'))
})

// convert error to ApiError, if needed
app.use(errorConverter)

// handle error
app.use(errorHandler)

module.exports = app
