const { ContentLibraryService } = require('../../../services/resources')

const all = async (req, res) => {
    try {
        const { offset, limit, ...query } = req.query

        const { docs, pages, total } = await ContentLibraryService.all(
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
        const contentLibrary = await ContentLibraryService.create(req.body)
        contentLibrary
            ? res.status(201).send({ contentLibrary })
            : res.status(400).send({ message: 'Content Library not created' })
    } catch (error) {
        res.status(400).send(error)
    }
}

const show = async (req, res) => {
    try {
        const { id } = req.params
        const contentLibrary = await ContentLibraryService.findById(id)
        contentLibrary
            ? res.status(200).send({ contentLibrary })
            : res.status(400).send({ message: 'contentLibrary not found' })
    } catch (error) {
        res.status(400).send(error)
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params
        const contentLibrary = await ContentLibraryService.update(req.body, { id })
        contentLibrary
            ? res.status(200).send({ contentLibrary })
            : res.status(400).send({ message: 'contentLibrary is not updated' })
    } catch (error) {
        res.status(400).send(error)
    }
}

const destroy = async (req, res) => {
    try {
        const { id } = req.params
        await ContentLibraryService.delete({ id })
        res.status(200).send({ message: 'Content Library is deleted' })
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
