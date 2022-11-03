const { Op } = require('sequelize')
const models = require('../../models')
const ResourceService = require('./resource')

class ContentService extends ResourceService {
    constructor() {
        super(models.Content)
    }

    async all(query = {}, offset = 1, limit = 20, sort = {}) {
        query.title && query.title !== '' ? query.title = { [Op.iLike]: `%${query.title}%` } : delete query.title
        const data = await super.all(query, offset, limit, sort)
        return data
    }
}

module.exports = new ContentService()
