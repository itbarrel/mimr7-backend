const { Op } = require('sequelize')
const models = require('../../models')
const ResourceService = require('./resource')

class LocationService extends ResourceService {
    constructor() {
        super(models.Location)
    }

    async all(query = {}, offset = 1, limit = 20, sort = {}) {
        // eslint-disable-next-line no-unused-expressions
        query.name && query.name !== '' ? query.name = { [Op.iLike]: `%${query.name}%` } : delete query.name
        const data = await super.all(query, offset, limit, sort)
        return data
    }
}

module.exports = new LocationService()
