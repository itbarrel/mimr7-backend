const { Op } = require('sequelize')
const models = require('../../models')
const ResourceService = require('./resource')

class LocationService extends ResourceService {
    constructor() {
        super(models.Location)
    }

    async all(query = {}, offset = 1, limit = 20, sort = {}) {
        query.name && query.name !== '' ? query.name = { [Op.iLike]: `%${query.name}%` } : delete query.name
        return await super.all(query, offset, limit, sort)
    }
}

module.exports = new LocationService()
