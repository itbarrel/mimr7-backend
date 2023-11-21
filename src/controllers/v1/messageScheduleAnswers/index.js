const natural = require('natural')
const { MessageScheduleAnswerService } = require('../../../services/resources')

const all = async (req, res, next) => {
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

        res.send({ data: docs, pages, total })
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const MessageScheduleAnswer = await MessageScheduleAnswerService.create(
            req.body,
        )
        const { response } = MessageScheduleAnswer
        const messageSchedule = await MessageScheduleAnswer.getMessageSchedule()
        const { solution } = await messageSchedule.getMessage()

        // calculate the similarity or correctness score
        const distance = natural.LevenshteinDistance(solution, response)
        const maxLength = Math.max(solution.length, response.length)
        const similarity = 1 - distance / maxLength
        const similarityPer = similarity * 100

        similarityPer >= 80
            ? (messageSchedule.answerStatus = true)
            : (messageSchedule.answerStatus = false)
        await messageSchedule.save()
        res.send({ MessageScheduleAnswer })
    } catch (error) {
        next(error)
    }
}

const show = async (req, res, next) => {
    try {
        const { id } = req.params
        const MessageScheduleAnswer = await MessageScheduleAnswerService.findById(
            id,
        )
        res.send({ MessageScheduleAnswer })
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const { id } = req.params
        const MessageScheduleAnswer = await MessageScheduleAnswerService.update(
            req.body,
            { id },
        )
        res.send(MessageScheduleAnswer)
    } catch (error) {
        next(error)
    }
}

const destroy = async (req, res, next) => {
    try {
        const { id } = req.params
        await MessageScheduleAnswerService.delete({ id })
        res.send({ MessageScheduleAnswer: 'MessageScheduleAnswer is deleted' })
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
}
