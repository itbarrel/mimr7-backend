const { AccountService, RoleService } = require('../../../services/resources')

const all = async (req, res) => {
    try {
        const {
            offset, limit, sort, ...query
        } = req.query
        const { docs, pages, total } = await AccountService.all(
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
        const account = await AccountService.create(req.body)
        account
            ? res.status(201).send({ account })
            : res.status(400).send({ message: 'Account is not created' })
    } catch (error) {
        res.status(400).send(error)
    }
}

const show = async (req, res) => {
    try {
        const { id } = req.params
        const account = await AccountService.findById(id)
        if (!account) {
            res.status(400).send({ message: 'account not found' })
        }
        const role = await RoleService.findByQuery({
            name: 'Admin',
            AccountId: account.id,
        })
        if (!role) {
            res.status(400).send({ message: 'role not found' })
        }
        const admin = await account.getUsers({ where: { RoleId: role.id } })
        if (!admin) {
            res.status(400).send({ message: 'admin not found' })
        }
        res.status(200).send({ account, admin })
    } catch (error) {
        res.status(400).send(error)
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params
        const account = await AccountService.update(req.body, { id })
        if (!account) {
            res.status(400).send({ message: 'account not found' })
        }
        const role = await RoleService.findByQuery({
            name: 'Admin',
            AccountId: account.id,
        })
        if (!role) {
            res.status(400).send({ message: 'role not found' })
        }
        const admin = await account.getUsers({ where: { RoleId: role.id } })
        if (!admin) {
            res.status(400).send({ message: 'admin not found' })
        }
        res.status(200).send({ account, admin })
    } catch (error) {
        res.status(400).send(error)
    }
}

const destroy = async (req, res) => {
    try {
        const { id } = req.params
        await AccountService.delete({ id })
        res.status(200).send({ message: 'Account is deleted' })
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
