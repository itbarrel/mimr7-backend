const { ClassListScheduleService } = require('../../../services/resources')

const all = async (req, res, next) => {
    try {
        const { offset, limit, ...query } = req.query

        const { docs, pages, total } = await ClassListScheduleService.all(query, offset, limit)

        res.send({ data: docs, pages, total })
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const ClassListSchedule = await ClassListScheduleService.create(req.body)
        res.send({ ClassListSchedule })
    } catch (error) {
        next(error)
    }
}

const show = async (req, res, next) => {
    try {
        const { id } = req.params
        const ClassListSchedule = await ClassListScheduleService.findById(id)
        res.send({ ClassListSchedule })
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const { id } = req.params
        const ClassListSchedule = await ClassListScheduleService.update(req.body, { id })
        res.send(ClassListSchedule)
    } catch (error) {
        next(error)
    }
}

const destroy = async (req, res, next) => {
    try {
        const { id } = req.params
        await ClassListScheduleService.delete({ id })
        res.send({ message: 'ClassListSchedule is deleted' })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    all, create, show, update, destroy,
}
