const { Op } = require('sequelize')
const { ContentService, ClassListService } = require('../../../services/resources')

const all = async (req, res, next) => {
    try {
        const {
            offset, limit, sort, ...query
        } = req.query

        const { docs, pages, total } = await ContentService.all(query, offset, limit, sort)

        res.send({ data: docs, pages, total })
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const content = await ContentService.create(req.body)
        res.send({ content })
    } catch (error) {
        next(error)
    }
}

const show = async (req, res, next) => {
    try {
        const { id } = req.params
        const content = await ContentService.findById(id)
        res.send({ content })
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const { id } = req.params
        const content = await ContentService.update(req.body, { id })
        res.send(content)
    } catch (error) {
        next(error)
    }
}

const destroy = async (req, res, next) => {
    try {
        const { id } = req.params
        await ContentService.delete({ id })
        res.send({ message: 'content is deleted' })
    } catch (error) {
        next(error)
    }
}
const getAllContent = async (req, res, next) => {
    try {
        const { id } = req.params
        const classList = await ClassListService.findById(id)

        const contents = await classList.getContents()
        const Ids = contents.map((content) => content.id)
        const { docs: Contents } = await ContentService.all({ id: { [Op.notIn]: Ids } })

        res.send({ Contents })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    all, create, show, update, destroy, getAllContent,
}
