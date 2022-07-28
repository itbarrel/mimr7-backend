const models = require('../../models')
const ResourceService = require('./resource')

class RoleService extends ResourceService {
    constructor() {
        super(models.Role)
    }
}

module.exports = new RoleService()
