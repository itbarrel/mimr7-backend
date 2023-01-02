const { Op } = require('sequelize')
const models = require('../../models')
const storage = require('../../utils/cl-storage')
const ResourceService = require('./resource')

class ClassListService extends ResourceService {
    constructor() {
        super(models.ClassList)
    }

    async all(query = {}, offset = 1, limit = 20, sort = {}) {
        query.name && query.name !== '' ? query.name = { [Op.iLike]: `%${query.name}%` } : delete query.name
        const { accountId, role } = storage.get('decoded')
        if (role !== 'SuperAdmin') {
            query.AccountId = accountId
        }
        const sorted = []
        Object.keys(sort).map((key) => sorted.push([key, sort[key]]))
        const options = {
            // offset: offset * (limit + 1),
            where: query,
            page: offset,
            paginate: limit,
            order: sorted,
            include: [{
                model: models.Student,
            }, { model: models.Content }],

        }
        return this.model.paginate(options)
    }
}

module.exports = new ClassListService()
