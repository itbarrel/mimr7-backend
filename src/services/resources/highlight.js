const { Op } = require('sequelize')
const models = require('../../models')
const ResourceService = require('./resource')

class HighlightService extends ResourceService {
    constructor() {
        super(models.Highlight)
    }

    async all(query = {}, offset = 1, limit = 20, sort = {}) {
        query.content && query.content !== '' ? query.content = { [Op.iLike]: `%${query.content}%` } : delete query.content
        return await super.all(query, offset, limit, sort)
    }
}

module.exports = new HighlightService()
