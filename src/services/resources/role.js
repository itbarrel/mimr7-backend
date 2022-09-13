const models = require('../../models')
const ResourceService = require('./resource')

class RoleService extends ResourceService {
    constructor() {
        super(models.Role)
        this.mainRoles = [
            {
                name: 'Admin',
                default: true,
            },
            {
                name: 'Manager',
                default: true,
            },
        ]
    }

    async createDefaultRolesFor(id) {
        return Promise.all(this.mainRoles.map(async (role) => {
            role.AccountId = id
            await this.model.create(role)
        }))
    }
}

module.exports = new RoleService()
