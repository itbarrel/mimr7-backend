const models = require('../../models')
const ResourceService = require('./resource')

class ContentplanTemplateService extends ResourceService {
    constructor() {
        super(models.ContentplanTemplate)
    }
}

module.exports = new ContentplanTemplateService()
