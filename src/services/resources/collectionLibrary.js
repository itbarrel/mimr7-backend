const { Op } = require('sequelize')
const models = require('../../models')
const ResourceService = require('./resource')

class CollectionLibraryService extends ResourceService {
    constructor() {
        super(models.CollectionLibrary)
    }

    async all(query = {}, offset = 1, limit = 20, sort = {}) {
        query.title && query.title !== '' ? query.title = { [Op.iLike]: `%${query.title}%` } : delete query.title
        return await super.all(query, offset, limit, sort)
    }
}

module.exports = new CollectionLibraryService()
