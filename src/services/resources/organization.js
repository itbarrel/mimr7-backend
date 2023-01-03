const { Op } = require('sequelize')
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

    async all(query = {}, offset = 1, limit = 20, sort = {}) {
        query.name && query.name !== '' && query.name !== 'undefined' ? query.name = { [Op.iLike]: `%${query.name}%` } : delete query.name
        const data = await super.all(query, offset, limit, sort)
        return data
    }
}

module.exports = new OrganizationService()
