const { Op } = require('sequelize')
const storage = require('../../utils/cl-storage')
const models = require('../../models')
const ResourceService = require('./resource')

class ContentService extends ResourceService {
    constructor() {
        super(models.Content)
    }

    async all(query = {}, offset = 1, limit = 20, sort = {}) {
        const { accountId, role } = storage.get('decoded')
        if (role !== 'SuperAdmin') {
            query.AccountId = accountId
        }
        // eslint-disable-next-line no-unused-expressions
        query.title && query.title !== '' ? query.title = { [Op.iLike]: `%${query.title}%` } : delete query.title
        const sorted = []
        Object.keys(sort).map((key) => sorted.push([key, sort[key]]))

        const options = {
            where: query,
            page: offset,
            paginate: limit,
            order: sorted,
            include: [{
                model: models.Highlight,
            }],
            group: ['Content.id'],
        }

        return this.model.paginate(options)
    }
}

module.exports = new ContentService()
