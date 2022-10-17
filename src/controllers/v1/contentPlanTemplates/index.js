const { ContentplanTemplateService } = require('../../../services/resources')

const all = async (req, res, next) => {
    try {
        const {
            offset, limit, sort, ...query
        } = req.query

        const { docs, pages, total } = await ContentplanTemplateService.all(query, offset, limit, sort)

        res.send({ data: docs, pages, total })
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const contentplanTemplate = await ContentplanTemplateService.create(req.body)
        res.send({ contentplanTemplate })
    } catch (error) {
        next(error)
    }
}

const show = async (req, res, next) => {
    try {
        const { id } = req.params
        const contentplanTemplate = await ContentplanTemplateService.findById(id)
        res.send({ contentplanTemplate })
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const { id } = req.params
        const contentplanTemplate = await ContentplanTemplateService.update(req.body, { id })
        res.send(contentplanTemplate)
    } catch (error) {
        next(error)
    }
}

const destroy = async (req, res, next) => {
    try {
        const { id } = req.params
        await ContentplanTemplateService.delete({ id })
        res.send({ message: 'contentplanTemplate is deleted' })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    all, create, show, update, destroy,
}
