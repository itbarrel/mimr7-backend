const models = require('../../models')
const ResourceService = require('./resource')

class ClassListService extends ResourceService {
    constructor() {
        super(models.ClassList)
    }
}

module.exports = new ClassListService()
