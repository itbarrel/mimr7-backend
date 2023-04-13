const { MessageScheduleService, StudentService, MessageService } = require('../../../services/resources')

const all = async (req, res, next) => {
    try {
        const {
            offset, limit, sort, ...query
        } = req.query

        const { docs, pages, total } = await MessageScheduleService.all(query, offset, limit, sort)

        res.send({ data: docs, pages, total })
    } catch (error) {
        next(error)
    }
}

const show = async (req, res, next) => {
    try {
        const { hash } = req.query
        const messageSchedule = await MessageScheduleService.findByQuery({ hash }, true)
        if (messageSchedule) {
            const { StudentId, MessageId, id } = messageSchedule
            const student = await StudentService.findById(StudentId)
            const message = await MessageService.findById(MessageId)
            res.send({ student, message, messageScheduleId: id })
        } else {
            res.send('MessageSchedule Not Found')
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    show, all,
}
