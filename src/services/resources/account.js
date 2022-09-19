const { Op } = require('sequelize')
const models = require('../../models')
const ResourceService = require('./resource')
const UserService = require('./user')
const OrganizationService = require('./organization')
const RoleService = require('./role')

class AccountService extends ResourceService {
    constructor() {
        super(models.Account)
    }

    async all(query = {}, offset = 1, limit = 20, sort = {}) {
        query.name && query.name !== '' ? query.name = { [Op.iLike]: `%${query.name}%` } : delete query.name
        return await super.all(query, offset, limit, sort)
    }

    async create(obj = {}) {
        try {
            const { admin, organization, ...accountObj } = obj
            const account = await this.model.create(accountObj)
            if (account) {
                await RoleService.createDefaultRolesFor(account.id)
                if (organization !== '' && organization !== null) {
                    organization.AccountId = account.id

                    const neworganization = await OrganizationService.createDefaultOrganizationFor(organization)
                    if (neworganization) {
                        admin.OrganizationId = neworganization.id
                    }
                }
                admin.AccountId = account.id
                await UserService.createDefaultUsersFor(admin)
                return account
            }
        } catch (error) {
            return error
        }
    }
}

module.exports = new AccountService()
