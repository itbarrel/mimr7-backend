const { CollectionService } = require('../../../services/resources')

const all = async (req, res, next) => {
    try {
        const { offset, limit, sort, ...query } = req.query

        const { docs, pages, total } = await CollectionService.all(query, offset, limit, sort)

        res.send({ data: docs, pages, total })
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const collection = await CollectionService.create(req.body)
        res.send({ collection })
    } catch (error) {
        next(error)
    }
}

const show = async (req, res, next) => {
    try {
        const { id } = req.params
        const collection = await CollectionService.findById(id)
        res.send({ collection })
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const { id } = req.params
        const collection = await CollectionService.update(req.body, { id })
        res.send(collection)
    } catch (error) {
        next(error)
    }
}

const destroy = async (req, res, next) => {
    try {
        const { id } = req.params
        await CollectionService.delete({ id })
        res.send({ message: 'collection is deleted' })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    all, create, show, update, destroy,
}
