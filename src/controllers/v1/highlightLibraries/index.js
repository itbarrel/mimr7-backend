const { HighlightLibraryService } = require('../../../services/resources')

const all = async (req, res, next) => {
    try {
        const { offset, limit, ...query } = req.query

        const { docs, pages, total } = await HighlightLibraryService.all(query, offset, limit)

        res.send({ data: docs, pages, total })
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const highlightLibrary = await HighlightLibraryService.create(req.body)
        res.send({ highlightLibrary })
    } catch (error) {
        next(error)
    }
}

const show = async (req, res, next) => {
    try {
        const { id } = req.params
        const highlightLibrary = await HighlightLibraryService.findById(id)
        res.send({ highlightLibrary })
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const { id } = req.params
        const highlightLibrary = await HighlightLibraryService.update(req.body, { id })
        res.send(highlightLibrary)
    } catch (error) {
        next(error)
    }
}

const destroy = async (req, res, next) => {
    try {
        const { id } = req.params
        await HighlightLibraryService.delete({ id })
        res.send({ message: 'highlightLibrary is deleted' })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    all, create, show, update, destroy,
}
