const models = require('../../models')
const ResourceService = require('./resource')
const sequelize = require('../../utils/dbConnection')

class MessageScheduleService extends ResourceService {
    constructor() {
        super(models.MessageSchedule)
    }

    async all(query = {}, offset = 1, limit = 20, sort = {}) {
        const sorted = []
        Object.keys(sort).map((key) => sorted.push([key, sort[key]]))
        const options = {
            // offset: offset * (limit + 1),
            where: query,
            page: offset,
            paginate: limit,
            order: sorted,
        }
        return this.model.paginate(options)
    }

    async findall(messageRepetition, studenId, students) {
        if (studenId !== null) {
            return this.model.findAll({
                attributes: ['MessageId'],
                where: { StudentId: studenId },
                group: ['MessageId'],
                having: sequelize.where(
                    sequelize.fn('COUNT', sequelize.col('MessageId')),
                    messageRepetition,
                ),
            })
        }
        return models.MessageSchedule.findAll({
            attributes: ['MessageId'],
            group: ['MessageId'],
            having: sequelize.where(
                sequelize.fn('COUNT', sequelize.col('MessageId')),
                messageRepetition * students,
            ),
        })
    }
}

module.exports = new MessageScheduleService()
