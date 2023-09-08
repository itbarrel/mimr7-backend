const { PlayerService } = require('../../../services/resources')

const all = async (req, res) => {
    try {
        const {
            offset, limit, sort, ...query
        } = req.query

        const { docs, pages, total } = await PlayerService.all(
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
        const player = await PlayerService.create(req.body)
        player
            ? res.status(201).send({ player })
            : res.status(400).send({ message: 'Player is not created' })
    } catch (error) {
        res.status(400).send(error)
    }
}

const show = async (req, res) => {
    try {
        const { id } = req.params
        const player = await PlayerService.findById(id)
        player
            ? res.status(200).send({ player })
            : res.status(400).send({ message: 'Player not found' })
    } catch (error) {
        res.status(400).send(error)
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params
        const player = await PlayerService.update(req.body, { id })
        player
            ? res.status(200).send({ player })
            : res.status(400).send({ message: 'Player is not updated' })
    } catch (error) {
        res.status(400).send(error)
    }
}

const destroy = async (req, res) => {
    try {
        const { id } = req.params
        await PlayerService.delete({ id })
        res.status(200).send({ message: 'player is deleted' })
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
