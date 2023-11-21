const { MessageService } = require('../../../services/resources')

const all = async (req, res, next) => {
    try {
        const {
            offset, limit, sort, ...query
        } = req.query

        const { docs, pages, total } = await MessageService.all(
            query,
            offset,
            limit,
            sort,
        )

        res.send({ data: docs, pages, total })
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const message = await MessageService.create(req.body)
        res.send({ message })
    } catch (error) {
        next(error)
    }
}

const show = async (req, res, next) => {
    try {
        const { id } = req.params
        const message = await MessageService.findById(id)
        res.send({ message })
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const { id } = req.params
        const message = await MessageService.update(req.body, { id })
        res.send(message)
    } catch (error) {
        next(error)
    }
}
const bulkCreate = async (req, res, next) => {
    try {
        const { messages } = req.body

        const resMessages = await MessageService.bulkcreate(messages)
        res.send({ Messages: resMessages })
    } catch (error) {
        next(error)
    }
}

const destroy = async (req, res, next) => {
    try {
        const { id } = req.params
        await MessageService.delete({ id })
        res.send({ message: 'message is deleted' })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    all,
    create,
    show,
    update,
    destroy,
    bulkCreate,
}
