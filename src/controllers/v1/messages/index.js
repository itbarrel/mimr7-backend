const { MessageService } = require('../../../services/resources')

const all = async (req, res) => {
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

        res.status(200).send({ data: docs, pages, total })
    } catch (error) {
        res.status(400).send(error)
    }
}

const create = async (req, res) => {
    try {
        const message = await MessageService.create(req.body)
        message
            ? res.status(201).send({ message })
            : res.status(400).send({ message: 'message not created' })
    } catch (error) {
        res.status(400).send(error)
    }
}

const show = async (req, res) => {
    try {
        const { id } = req.params
        const message = await MessageService.findById(id)
        message
            ? res.status(200).send({ message })
            : res.status(400).send({ message: 'message not found' })
    } catch (error) {
        res.status(400).send(error)
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params
        const message = await MessageService.update(req.body, { id })
        message
            ? res.status(200).send({ message })
            : res.status(400).send({ message: 'message is not updated' })
    } catch (error) {
        res.status(400).send(error)
    }
}

const destroy = async (req, res) => {
    try {
        const { id } = req.params
        await MessageService.delete({ id })
        res.status(200).send({ message: 'message is deleted' })
    } catch (error) {
        res.status(400).send(error)
    }
}

module.exports = {
    all,
    create,
    show,
    update,
    destroy,
}
