const { UserService } = require('../../../services/resources')

const all = async (req, res) => {
    try {
        const {
            offset, limit, sort, ...query
        } = req.query

        const { docs, pages, total } = await UserService.all(
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
        const user = await UserService.create(req.body)
        if (user) {
            await user.signUpEmail(req.body.password)
            res.status(201).send({ message: 'Email is sent', user })
        } else {
            res.status(400).send({ message: 'Users is not created' })
        }
    } catch (error) {
        res.status(400).send(error)
    }
}

const show = async (req, res) => {
    try {
        const { id } = req.params
        const user = await UserService.findById(id)
        user
            ? res.status(200).send({ user })
            : res.status(400).send({ message: 'User not found' })
    } catch (error) {
        res.status(400).send(error)
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params
        const user = await UserService.update(req.body, { id })
        user
            ? res.status(200).send({ user })
            : res.status(400).send({ message: 'User is not updated' })
    } catch (error) {
        res.status(400).send(error)
    }
}

const destroy = async (req, res) => {
    try {
        const { id } = req.params
        await UserService.delete({ id })
        res.status(200).send({ message: 'User is deleted' })
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
