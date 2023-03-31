const models = require('../../models')
const ResourceService = require('./resource')

class MessageScheduleService extends ResourceService {
    constructor() {
        super(models.MessageSchedule)
    }

}

module.exports = new MessageScheduleService()
