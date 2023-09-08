const { LocationService } = require('../../../services/resources')

const all = async (req, res) => {
    try {
        const {
            offset, limit, sort, ...query
        } = req.query

        const { docs, pages, total } = await LocationService.all(
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
        const location = await LocationService.create(req.body)
        location
            ? res.status(201).send({ location })
            : res.status(400).send({ message: 'location not created' })
    } catch (error) {
        res.status(400).send(error)
    }
}

const show = async (req, res) => {
    try {
        const { id } = req.params
        const location = await LocationService.findById(id)
        location
            ? res.status(200).send({ location })
            : res.status(400).send({ message: 'location not found' })
    } catch (error) {
        res.status(400).send(error)
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params
        const location = await LocationService.update(req.body, { id })
        location
            ? res.status(200).send({ location })
            : res.status(400).send({ message: 'location is not updated' })
    } catch (error) {
        res.status(400).send(error)
    }
}

const destroy = async (req, res) => {
    try {
        const { id } = req.params
        await LocationService.delete({ id })
        res.status(200).send({ message: 'location is deleted' })
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
