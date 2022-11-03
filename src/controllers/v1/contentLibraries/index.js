const { ContentLibraryService } = require('../../../services/resources')

const all = async (req, res, next) => {
    try {
        const { offset, limit, ...query } = req.query

        const { docs, pages, total } = await ContentLibraryService.all(query, offset, limit)

        res.send({ data: docs, pages, total })
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const contentLibrary = await ContentLibraryService.create(req.body)
        res.send({ contentLibrary })
    } catch (error) {
        next(error)
    }
}

const show = async (req, res, next) => {
    try {
        const { id } = req.params
        const contentLibrary = await ContentLibraryService.findById(id)
        res.send({ contentLibrary })
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const { id } = req.params
        const contentLibrary = await ContentLibraryService.update(req.body, { id })
        res.send(contentLibrary)
    } catch (error) {
        next(error)
    }
}

const destroy = async (req, res, next) => {
    try {
        const { id } = req.params
        await ContentLibraryService.delete({ id })
        res.send({ message: 'contentLibrary is deleted' })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    all, create, show, update, destroy,
}
