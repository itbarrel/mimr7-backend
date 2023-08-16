const { Op } = require('sequelize')
const storage = require('../../utils/cl-storage')
const models = require('../../models')
const ResourceService = require('./resource')

class HighlightService extends ResourceService {
    constructor() {
        super(models.Highlight)
    }

    async all(query = {}, offset = 1, limit = 20, sort = {}) {
        const { accountId, role } = storage.get('decoded')
        if (role !== 'SuperAdmin') {
            query.AccountId = accountId
        }
        // eslint-disable-next-line no-unused-expressions
        (query.content && query.content !== '') ? query.content = { [Op.iLike]: `%${query.content}%` } : delete query.content
        const sorted = []
        Object.keys(sort).map((key) => sorted.push([key, sort[key]]))

        const options = {
            where: query,
            page: offset,
            paginate: limit,
            order: sorted,
            include: [{
                model: models.Message,
            }],
            group: ['Highlight.id'],
        }

        return this.model.paginate(options)
    }
}

module.exports = new HighlightService()
