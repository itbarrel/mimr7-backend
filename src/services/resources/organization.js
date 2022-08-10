const models = require('../../models')
const ResourceService = require('./resource')

class OrganizationService extends ResourceService {
    constructor() {
        super(models.Organization)
    }

    async createDefaultOrganizationFor(organizationObj) {
        const organization = await this.model.create(organizationObj)
        return organization
    }
}

module.exports = new OrganizationService()
