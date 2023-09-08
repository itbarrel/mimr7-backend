const {
    MessageScheduleService,
    StudentService,
    MessageService,
} = require('../../../services/resources')

const all = async (req, res) => {
    try {
        const {
            offset, limit, sort, ...query
        } = req.query

        const { docs, pages, total } = await MessageScheduleService.all(
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

const show = async (req, res) => {
    try {
        const { hash } = req.query
        const messageSchedule = await MessageScheduleService.findByQuery(
            { hash },
            true,
        )
        if (messageSchedule) {
            const { StudentId, MessageId, id } = messageSchedule
            const student = await StudentService.findById(StudentId)
            const message = await MessageService.findById(MessageId)
            res.status(200).send({ student, message, messageScheduleId: id })
        } else {
            res.status(400).send('MessageSchedule Not Found')
        }
    } catch (error) {
        res.status(400).send(error)
    }
}

module.exports = {
    show,
    all,
}
