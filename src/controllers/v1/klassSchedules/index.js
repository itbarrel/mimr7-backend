const { KlassScheduleService } = require('../../../services/resources')

const all = async (req, res) => {
    try {
        const { offset, limit, ...query } = req.query

        const { docs, pages, total } = await KlassScheduleService.all(
            query,
            offset,
            limit,
        )

        res.status(200).send({ data: docs, pages, total })
    } catch (error) {
        res.status(400).send(error)
    }
}

const create = async (req, res) => {
    try {
        const KlassSchedule = await KlassScheduleService.create(req.body)
        KlassSchedule
            ? res.status(201).send({ KlassSchedule })
            : res.status(400).send({ message: 'Klass Schedule is not created' })
    } catch (error) {
        res.status(400).send(error)
    }
}

const show = async (req, res) => {
    try {
        const { id } = req.params
        const KlassSchedule = await KlassScheduleService.findById(id)
        KlassSchedule
            ? res.status(200).send({ KlassSchedule })
            : res.status(400).send({ message: 'KlassSchedule not found' })
    } catch (error) {
        res.status(400).send(error)
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params
        const KlassSchedule = await KlassScheduleService.update(req.body, { id })
        KlassSchedule
            ? res.status(200).send({ KlassSchedule })
            : res.status(400).send({ message: 'KlassSchedule is not updated' })
    } catch (error) {
        res.status(400).send(error)
    }
}

const destroy = async (req, res) => {
    try {
        const { id } = req.params
        await KlassScheduleService.delete({ id })
        res.status(200).send({ message: 'KlassSchedule is deleted' })
    } catch (error) {
        res.status(400).send(error)
    }
}

const complete = async (req, res) => {
    try {
        const { AccountId, OrganizationId } = req.query
        const completeKlasses = await KlassScheduleService.findByQuery(
            { AccountId, OrganizationId, active: false },
            false,
        )
        res.status(200).send({ completeKlasses })
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
    complete,
}
