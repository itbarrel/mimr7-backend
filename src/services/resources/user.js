const models = require('../../models')
const ResourceService = require('./resource')
const RoleService = require('./role')

class UserService extends ResourceService {
    constructor() {
        super(models.User)
    }

    async createDefaultUsersFor(userObj) {
        const role = await RoleService.findByQuery({ value: 'admin' })
        userObj.RoleId = role.id

        const user = await this.model.create(userObj)
        return user
    }
}

module.exports = new UserService()
