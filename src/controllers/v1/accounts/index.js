const { AccountService, RoleService } = require('../../../services/resources')

const all = async (req, res, next) => {
    try {
        const {
            offset, limit, sort, ...query
        } = req.query
        const { docs, pages, total } = await AccountService.all(query, offset, limit, sort)

        res.send({ data: docs, pages, total })
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const account = await AccountService.create(req.body)
        res.send(account)
    } catch (error) {
        next(error)
    }
}

const show = async (req, res, next) => {
    try {
        const { id } = req.params
        const account = await AccountService.findById(id)
        const role = await RoleService.findByQuery({ name: 'Admin', AccountId: account.id })
        const admin = await account.getUsers({ where: { RoleId: role.id } })
        res.send({ account, admin })
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const { id } = req.params
        const account = await AccountService.update(req.body, { id })
        const role = await RoleService.findByQuery({ name: 'Admin', AccountId: account.id })
        const admin = await account.getUsers({ where: { RoleId: role.id } })
        res.send({ account, admin })
    } catch (error) {
        next(error)
    }
}

const destroy = async (req, res, next) => {
    try {
        const { id } = req.params
        await AccountService.delete({ id })
        res.send({ message: 'Account is deleted' })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    all, create, show, update, destroy,
}
