const { Op } = require('sequelize')
const models = require('../../models')
const ResourceService = require('./resource')

class CollectionService extends ResourceService {
    constructor() {
        super(models.Collection)
    }

    async all(query = {}, offset = 1, limit = 20, sort = {}) {
        query.title && query.title !== '' ? query.title = { [Op.iLike]: `%${query.title}%` } : delete query.title
        return await super.all(query, offset, limit, sort)
    }
}

module.exports = new CollectionService()
