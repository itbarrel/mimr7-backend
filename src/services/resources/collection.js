const { Op } = require('sequelize')
const models = require('../../models')
const ResourceService = require('./resource')
const storage = require('../../utils/cl-storage')

class CollectionService extends ResourceService {
    constructor() {
        super(models.Collection)
    }

    async all(query = {}, offset = 1, limit = 20, sort = {}) {
        const { accountId, role } = storage.get('decoded')
        if (role !== 'SuperAdmin') {
            query.AccountId = accountId
        }
        const sorted = []
        Object.keys(sort).map((key) => sorted.push([key, sort[key]]))
        query.title && query.title !== '' ? query.title = { [Op.iLike]: `%${query.title}%` } : delete query.title
        const options = {
            // offset: offset * (limit + 1),
            where: query,
            page: offset,
            paginate: limit,
            order: sorted,

        }
        return this.model.paginate(options)
    }
}

module.exports = new CollectionService()
