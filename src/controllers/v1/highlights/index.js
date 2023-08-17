const { HighlightService } = require('../../../services/resources')

const all = async (req, res, next) => {
    try {
        const { offset, limit, ...query } = req.query

        const { docs, pages, total } = await HighlightService.all(query, offset, limit)

        res.send({ data: docs, pages, total })
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const highlight = await HighlightService.create(req.body)
        res.send({ highlight })
    } catch (error) {
        next(error)
    }
}

const show = async (req, res, next) => {
    try {
        const { id } = req.params
        const highlight = await HighlightService.findById(id)
        res.send({ highlight })
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const { id } = req.params
        const highlight = await HighlightService.update(req.body, { id })
        res.send(highlight)
    } catch (error) {
        next(error)
    }
}

const destroy = async (req, res, next) => {
    try {
        const { id } = req.params
        await HighlightService.delete({ id })
        res.send({ message: 'highlight is deleted' })
    } catch (error) {
        next(error)
    }
}
const bulkCreate = async (req, res, next) => {
    try {
        const { highlights } = req.body

        const highlight = await HighlightService.bulkcreate(highlights)
        res.send({ highlight })
    } catch (error) {
        next(error)
    }
}
module.exports = {
    all, create, show, update, destroy, bulkCreate,
}
