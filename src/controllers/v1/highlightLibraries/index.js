const { HighlightLibraryService } = require('../../../services/resources')

const all = async (req, res) => {
    try {
        const { offset, limit, ...query } = req.query

        const { docs, pages, total } = await HighlightLibraryService.all(
            query,
            offset,
            limit,
        )

        res.status(200).send({ data: docs, pages, total })
    } catch (error) {
        res.status(400).send(error)
    }
}

const create = async (req, res) => {
    try {
        const highlightLibrary = await HighlightLibraryService.create(req.body)
        highlightLibrary
            ? res.status(201).send({ highlightLibrary })
            : res.status(400).send({ message: 'Highligh tLibrary is not created' })
    } catch (error) {
        res.status(400).send(error)
    }
}

const show = async (req, res) => {
    try {
        const { id } = req.params
        const highlightLibrary = await HighlightLibraryService.findById(id)
        highlightLibrary
            ? res.status(200).send({ highlightLibrary })
            : res.status(400).send({ message: 'highlightLibrary not found' })
    } catch (error) {
        res.status(400).send(error)
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params
        const highlightLibrary = await HighlightLibraryService.update(req.body, {
            id,
        })
        highlightLibrary
            ? res.status(200).send({ highlightLibrary })
            : res.status(400).send({ message: 'highlightLibrary is not updated' })
    } catch (error) {
        res.status(400).send(error)
    }
}

const destroy = async (req, res) => {
    try {
        const { id } = req.params
        await HighlightLibraryService.delete({ id })
        res.status(200).send({ message: 'highlightLibrary is deleted' })
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
