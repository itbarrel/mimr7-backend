const models = require('../../models')
const ResourceService = require('./resource')

class MessageScheduleAnswerService extends ResourceService {
    constructor() {
        super(models.MessageScheduleAnswer)
    }
}

module.exports = new MessageScheduleAnswerService()
