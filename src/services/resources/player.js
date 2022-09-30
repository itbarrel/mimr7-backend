const { Op } = require('sequelize')
const models = require('../../models')
const ResourceService = require('./resource')

class PlayerService extends ResourceService {
    constructor() {
        super(models.Player)
    }

    async all(query = {}, offset = 1, limit = 20, sort = {}) {
        query.firstName && query.firstName !== '' ? query.firstName = { [Op.iLike]: `%${query.firstName}%` } : delete query.firstName
        const data = await super.all(query, offset, limit, sort)
        return data
    }
}

module.exports = new PlayerService()
