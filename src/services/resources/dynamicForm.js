const models = require('../../models')
const ResourceService = require('./resource')

class DynamicFormService extends ResourceService {
    constructor() {
        super(models.DynamicForm)
    }
}

module.exports = new DynamicFormService()
