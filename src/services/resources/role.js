const models = require('../../models')
const ResourceService = require('./resource')

class RoleService extends ResourceService {
    constructor() {
        super(models.Role)
    }

    async all(query = {}, offset = 1, limit = 20) {
        const options = {
            // offset: offset * (limit + 1),
            where: query,
            page: offset,
            paginate: limit,
        }
        return this.model.paginate(options)
    }
}

module.exports = new RoleService()
