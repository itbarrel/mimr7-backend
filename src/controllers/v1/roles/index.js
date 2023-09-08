const { RoleService } = require('../../../services/resources')

const all = async (req, res) => {
    try {
        const { offset, limit, ...query } = req.query

        const { docs, pages, total } = await RoleService.all(query, offset, limit)

        res.status(200).send({ data: docs, pages, total })
    } catch (error) {
        res.status(400).send(error)
    }
}

const create = async (req, res) => {
    try {
        const role = await RoleService.create(req.body)
        role
            ? res.status(201).send({ role })
            : res.status(400).send({ message: 'role is not created' })
    } catch (error) {
        res.status(400).send(error)
    }
}

const show = async (req, res) => {
    try {
        const { id } = req.params
        const role = await RoleService.findById(id)
        role
            ? res.status(200).send({ role })
            : res.status(400).send({ message: 'Role not found' })
    } catch (error) {
        res.status(400).send(error)
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params
        const role = await RoleService.update(req.body, { id })
        role
            ? res.status(200).send({ role })
            : res.status(400).send({ message: 'Role is not updated' })
    } catch (error) {
        res.status(400).send(error)
    }
}

const destroy = async (req, res) => {
    try {
        const { id } = req.params
        await RoleService.delete({ id })
        res.status(200).send({ message: 'Role is deleted' })
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
