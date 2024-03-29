/* eslint-disable no-shadow */
/* eslint-disable no-const-assign */
const {
    KlassScheduleService,
    MessageScheduleService,
} = require('../../../services/resources')

const all = async (req, res, next) => {
    try {
        const { offset, limit, ...query } = req.query

        const { docs, pages, total } = await KlassScheduleService.all(
            query,
            offset,
            limit,
        )

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
        const {
            AccountId, OrganizationId, offset, limit,
        } = req.query
        const completeKlasses = await KlassScheduleService.all(
            { AccountId, OrganizationId, active: false },
            offset,
            limit,
        )
        res.send(completeKlasses)
    } catch (error) {
        next(error)
    }
}
const students = async (req, res, next) => {
    try {
        const { id } = req.params
        const { offset, limit } = req.query
        const { Klass, id: KlassScheduleId } = await KlassScheduleService.findByQuery({ id }, true, 'all', ['Klass'])
        const klassStudents = await Klass.getStudents()
        const totalStudents = klassStudents.length
        const totalPages = Math.ceil(totalStudents / limit)

        if (offset > totalPages) {
            offset = totalPages // Ensure that offset doesn't exceed total pages
        }

        const startIndex = (offset - 1) * limit
        const endIndex = offset * limit

        const paginatedStudents = klassStudents.slice(startIndex, endIndex)

        const studentData = await Promise.all(
            paginatedStudents.map(async (student) => {
                const { id, dataValues } = student
                const messageSchedules = await MessageScheduleService.findByQuery(
                    { StudentId: id, KlassScheduleId },
                    false,
                    'all',
                    ['MessageScheduleAnswer', 'Message'],
                )
                const trueAnswers = []
                const falseAnswers = []
                const notAnswered = []

                messageSchedules.map(async (message) => {
                    const { MessageScheduleAnswer, Message, answerStatus } = message

                    // eslint-disable-next-line no-unused-expressions, no-nested-ternary
                    MessageScheduleAnswer === null
                        ? notAnswered.push(Message)
                        : answerStatus
                            ? trueAnswers.push(Message)
                            : falseAnswers.push(Message)
                })

                const obj = {
                    ...dataValues,
                    trueAnswers,
                    falseAnswers,
                    notAnswered,
                }
                return obj
            }),
        )

        const response = {
            pages: totalPages,
            data: studentData,
            total: totalStudents,
        }

        res.send(response)
    } catch (error) {
        next(error)
    }
}
module.exports = {
    all,
    create,
    show,
    update,
    destroy,
    complete,
    students,
}
