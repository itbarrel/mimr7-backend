const models = require('../../models')
const ResourceService = require('./resource')

class KlassScheduleService extends ResourceService {
    constructor() {
        super(models.KlassSchedule)
    }
}

module.exports = new KlassScheduleService()
