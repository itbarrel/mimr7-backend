const { CollectionLibraryService } = require('../../../services/resources')

const all = async (req, res, next) => {
    try {
        const { offset, limit, ...query } = req.query

        const { docs, pages, total } = await CollectionLibraryService.all(query, offset, limit)

        res.send({ data: docs, pages, total })
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const collectionLibrary = await CollectionLibraryService.create(req.body)
        res.send({ collectionLibrary })
    } catch (error) {
        next(error)
    }
}

const show = async (req, res, next) => {
    try {
        const { id } = req.params
        const collectionLibrary = await CollectionLibraryService.findById(id)
        res.send({ collectionLibrary })
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const { id } = req.params
        const collectionLibrary = await CollectionLibraryService.update(req.body, { id })
        res.send(collectionLibrary)
    } catch (error) {
        next(error)
    }
}

const destroy = async (req, res, next) => {
    try {
        const { id } = req.params
        await CollectionLibraryService.delete({ id })
        res.send({ message: 'CollectionLibrary is deleted' })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    all, create, show, update, destroy,
}
