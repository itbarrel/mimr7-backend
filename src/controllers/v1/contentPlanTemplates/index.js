const { ContentplanTemplateService } = require('../../../services/resources')

const all = async (req, res) => {
    try {
        const {
            offset, limit, sort, ...query
        } = req.query

        const { docs, pages, total } = await ContentplanTemplateService.all(
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
        const contentplanTemplate = await ContentplanTemplateService.create(
            req.body,
        )
        contentplanTemplate
            ? res.status(201).send({ contentplanTemplate })
            : res
                .status(400)
                .send({ message: 'Content Plan Template is not created' })
    } catch (error) {
        res.status(400).send(error)
    }
}

const show = async (req, res) => {
    try {
        const { id } = req.params
        const contentplanTemplate = await ContentplanTemplateService.findById(id)
        contentplanTemplate
            ? res.status(200).send({ contentplanTemplate })
            : res.status(400).send({ message: 'contentplanTemplate not found' })
    } catch (error) {
        res.status(400).send(error)
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params
        const contentplanTemplate = await ContentplanTemplateService.update(
            req.body,
            { id },
        )
        contentplanTemplate
            ? res.status(200).send({ contentplanTemplate })
            : res.status(400).send({ message: 'contentplanTemplate is not updated' })
    } catch (error) {
        res.status(400).send(error)
    }
}

const destroy = async (req, res) => {
    try {
        const { id } = req.params
        await ContentplanTemplateService.delete({ id })
        res.status(200).send({ message: 'contentplanTemplate is deleted' })
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
