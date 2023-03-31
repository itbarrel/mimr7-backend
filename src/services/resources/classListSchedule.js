const { Op } = require('sequelize')
const models = require('../../models')
const ResourceService = require('./resource')

class ClassListScheduleService extends ResourceService {
    constructor() {
        super(models.ClassListSchedule)
    }

}

module.exports = new ClassListScheduleService()
