const { UserService } = require('../../../services/resources')

const all = async (req, res, next) => {
    try {
        const { offset, limit, sort, ...query } = req.query

        const { docs, pages, total } = await UserService.all(query, offset, limit, sort)

        res.send({ data: docs, pages, total })
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const user = await UserService.create(req.body)
        if (user) {
            await user.signUpEmail(req.body.password)
            res.send({ message: 'Email is send', user })
        } else {
            res.send({ message: 'Users is not created' })
        }
    } catch (error) {
        next(error)
    }
}

const show = async (req, res, next) => {
    try {
        const { id } = req.params
        const user = await UserService.findById(id)
        res.send({ user })
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const { id } = req.params
        const user = await UserService.update(req.body, { id })
        res.send(user)
    } catch (error) {
        next(error)
    }
}

const destroy = async (req, res, next) => {
    try {
        const { id } = req.params
        await UserService.delete({ id })
        res.send({ message: 'User is deleted' })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    all, create, show, update, destroy,
}
