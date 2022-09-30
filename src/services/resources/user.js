const { Op } = require('sequelize')
const models = require('../../models')
const ResourceService = require('./resource')
const RoleService = require('./role')

class UserService extends ResourceService {
    constructor() {
        super(models.User)
    }

    async createDefaultUsersFor(userObj) {
        const role = await RoleService.findByQuery({ value: 'admin', AccountId: userObj.AccountId })
        userObj.RoleId = role.id

        const user = await this.model.create(userObj)
        await user.signUpEmail(userObj.password)
        return user
    }

    async all(query = {}, offset = 1, limit = 20, sort = {}) {
        query.userName && query.userName !== '' ? query.userName = { [Op.iLike]: `%${query.userName}%` } : delete query.userName
        const data = await super.all(query, offset, limit, sort)
        return data
    }
}

module.exports = new UserService()
