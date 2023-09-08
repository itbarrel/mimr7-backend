const { MessageScheduleAnswerService } = require('../../../services/resources')

const all = async (req, res) => {
    try {
        const {
            offset, limit, sort, ...query
        } = req.query

        const { docs, pages, total } = await MessageScheduleAnswerService.all(
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
        const MessageScheduleAnswer = await MessageScheduleAnswerService.create(
            req.body,
        )
        MessageScheduleAnswer
            ? res.status(201).send({ MessageScheduleAnswer })
            : res
                .status(400)
                .send({ message: 'Message Schedule Answer is not created' })
    } catch (error) {
        res.status(400).send(error)
    }
}

const show = async (req, res) => {
    try {
        const { id } = req.params
        const MessageScheduleAnswer = await MessageScheduleAnswerService.findById(
            id,
        )
        MessageScheduleAnswer
            ? res.status(200).send({ MessageScheduleAnswer })
            : res.status(400).send({ message: 'MessageScheduleAnswer not found' })
    } catch (error) {
        res.status(400).send(error)
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params
        const MessageScheduleAnswer = await MessageScheduleAnswerService.update(
            req.body,
            { id },
        )
        MessageScheduleAnswer
            ? res.status(200).send({ MessageScheduleAnswer })
            : res
                .status(400)
                .send({ message: 'MessageScheduleAnswer is not updated' })
    } catch (error) {
        res.status(400).send(error)
    }
}

const destroy = async (req, res) => {
    try {
        const { id } = req.params
        await MessageScheduleAnswerService.delete({ id })
        res
            .status(200)
            .send({ MessageScheduleAnswer: 'MessageScheduleAnswer is deleted' })
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
