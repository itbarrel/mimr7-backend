const { OrganizationService } = require('../../../services/resources')

const all = async (req, res, next) => {
    try {
        const {
            offset, limit, sort, ...query
        } = req.query

        const { docs, pages, total } = await OrganizationService.all(query, offset, limit, sort)

        res.send({ data: docs, pages, total })
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const organization = await OrganizationService.create(req.body)
        res.send({ organization })
    } catch (error) {
        next(error)
    }
}

const show = async (req, res, next) => {
    try {
        const { id } = req.params
        const organization = await OrganizationService.findById(id)
        res.send({ organization })
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const { id } = req.params
        const organization = await OrganizationService.update(req.body, { id })
        res.send(organization)
    } catch (error) {
        next(error)
    }
}

const destroy = async (req, res, next) => {
    try {
        const { id } = req.params
        await OrganizationService.delete({ id })
        res.send({ message: 'Organization is deleted' })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    all, create, show, update, destroy,
}
