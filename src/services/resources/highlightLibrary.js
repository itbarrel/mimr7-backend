const { Op } = require('sequelize')
const models = require('../../models')
const ResourceService = require('./resource')

class HighlightLibraryService extends ResourceService {
    constructor() {
        super(models.HighlightLibrary)
    }

    async all(query = {}, offset = 1, limit = 20, sort = {}) {
        query.title && query.title !== '' ? query.title = { [Op.iLike]: `%${query.title}%` } : delete query.title
        return await super.all(query, offset, limit, sort)
    }
}

module.exports = new HighlightLibraryService()
