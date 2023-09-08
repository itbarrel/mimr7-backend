const { OrganizationService } = require('../../../services/resources')

const all = async (req, res) => {
    try {
        const {
            offset, limit, sort, ...query
        } = req.query

        const { docs, pages, total } = await OrganizationService.all(
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
        const organization = await OrganizationService.create(req.body)
        organization
            ? res.status(201).send({ organization })
            : res.status(400).send({ message: 'Organization is not created' })
    } catch (error) {
        res.status(400).send(error)
    }
}

const show = async (req, res) => {
    try {
        const { id } = req.params
        const organization = await OrganizationService.findById(id)
        organization
            ? res.status(200).send({ organization })
            : res.status(400).send({ message: 'Organization not found' })
    } catch (error) {
        res.status(400).send(error)
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params
        const organization = await OrganizationService.update(req.body, { id })
        organization
            ? res.status(200).send({ organization })
            : res.status(400).send({ message: 'Organization is not updated' })
    } catch (error) {
        res.status(400).send(error)
    }
}

const destroy = async (req, res) => {
    try {
        const { id } = req.params
        await OrganizationService.delete({ id })
        res.status(200).send({ message: 'Organization is deleted' })
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
