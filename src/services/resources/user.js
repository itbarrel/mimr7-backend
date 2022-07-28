const models = require('../../models')
const ResourceService = require('./resource')

class UserService extends ResourceService {
    constructor() {
        super(models.User)
    }
}

module.exports = new UserService()
