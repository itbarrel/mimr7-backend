const { HighlightService } = require('../../../services/resources')

const all = async (req, res) => {
    try {
        const { offset, limit, ...query } = req.query

        const { docs, pages, total } = await HighlightService.all(
            query,
            offset,
            limit,
        )

        res.send(200).send({ data: docs, pages, total })
    } catch (error) {
        res.status(400).send(error)
    }
}

const create = async (req, res) => {
    try {
        const highlight = await HighlightService.create(req.body)
        highlight
            ? res.status(201).send({ highlight })
            : res.status(400).send({ message: 'Highlight is not created' })
    } catch (error) {
        res.status(400).send(error)
    }
}

const show = async (req, res) => {
    try {
        const { id } = req.params
        const highlight = await HighlightService.findById(id)
        highlight
            ? res.status(200).send({ highlight })
            : res.status(400).send({ message: 'highlight not found' })
    } catch (error) {
        res.status(400).send(error)
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params
        const highlight = await HighlightService.update(req.body, { id })
        highlight
            ? res.status(200).send({ highlight })
            : res.status(400).send({ message: 'highlight is not updated' })
    } catch (error) {
        res.status(400).send(error)
    }
}

const destroy = async (req, res) => {
    try {
        const { id } = req.params
        await HighlightService.delete({ id })
        res.status(200).send({ message: 'highlight is deleted' })
    } catch (error) {
        res.status(400).send(error)
    }
}
const bulkCreate = async (req, res) => {
    try {
        const { highlights } = req.body

        const highlight = await HighlightService.bulkcreate(highlights)
        highlight
            ? res.status(201).send({ highlight })
            : res.status(400).send({ message: 'Highlight is not created' })
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
    bulkCreate,
}
