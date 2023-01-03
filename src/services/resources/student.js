const { Op } = require('sequelize')
const models = require('../../models')
const ResourceService = require('./resource')

class StudentService extends ResourceService {
    constructor() {
        super(models.Student)
    }

    async all(query = {}, offset = 1, limit = 20, sort = {}) {
        query.name && query.name !== '' ? query.name = { [Op.iLike]: `%${query.name}%` } : delete query.name
        const data = await super.all(query, offset, limit, sort)
        return data
    }
}

module.exports = new StudentService()