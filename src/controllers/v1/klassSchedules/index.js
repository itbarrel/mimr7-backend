const { KlassScheduleService } = require('../../../services/resources')

const all = async (req, res, next) => {
    try {
        const { offset, limit, ...query } = req.query

        const { docs, pages, total } = await KlassScheduleService.all(query, offset, limit)

        res.send({ data: docs, pages, total })
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const KlassSchedule = await KlassScheduleService.create(req.body)
        res.send({ KlassSchedule })
    } catch (error) {
        next(error)
    }
}

const show = async (req, res, next) => {
    try {
        const { id } = req.params
        const KlassSchedule = await KlassScheduleService.findById(id)
        res.send({ KlassSchedule })
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const { id } = req.params
        const KlassSchedule = await KlassScheduleService.update(req.body, { id })
        res.send(KlassSchedule)
    } catch (error) {
        next(error)
    }
}

const destroy = async (req, res, next) => {
    try {
        const { id } = req.params
        await KlassScheduleService.delete({ id })
        res.send({ message: 'KlassSchedule is deleted' })
    } catch (error) {
        next(error)
    }
}

const complete = async (req, res, next) => {
    try {
        const { AccountId, OrganizationId } = req.query
        const completeKlasses = await KlassScheduleService.findByQuery({ AccountId, OrganizationId, active: false }, false)
        res.send(completeKlasses)
    } catch (error) {
        next(error)
    }
}
module.exports = {
    all, create, show, update, destroy, complete,
}
