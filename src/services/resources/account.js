const models = require('../../models')
const ResourceService = require('./resource')
const UserService = require('./user')
const OrganizationService = require('./organization')

class AccountService extends ResourceService {
    constructor() {
        super(models.Account)
    }

    async create(obj = {}) {
        try {
            const { admin, organization, ...accountObj } = obj
            const account = await this.model.create(accountObj)
            if (account) {
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
