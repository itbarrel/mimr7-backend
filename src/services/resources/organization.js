const models = require('../../models')
const ResourceService = require('./resource')

class OrganizationService extends ResourceService {
    constructor() {
        super(models.Organization)
    }
}

module.exports = new OrganizationService()
