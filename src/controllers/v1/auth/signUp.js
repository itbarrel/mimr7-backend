const {
    AccountService, RoleService, UserService, OrganizationService,
} = require('../../../services/resources')

const signUp = async (req, res) => {
    try {
        const { user } = req.body
        const userName = await UserService.findByQuery({ userName: user.userName })
        if (userName) {
            res.status(409).send({ message: 'UserName is already taken change the UserName' })
            return
        }
        const account = await AccountService.personalAccountCreate({ name: `${user.userName} personal`, type: 'personal' })
        if (account) {
            await RoleService.createDefaultRolesFor(account.id)
            const obj = { name: `${user.userName} personal`, AccountId: account.id }
            const perOrganization = await OrganizationService.create(obj)
            if (perOrganization) {
                user.OrganizationId = perOrganization.id
            }

            user.AccountId = account.id
            const AccountUser = await UserService.createDefaultUsersFor(user)

            res.status(200).send({
                message: 'Successfully Created', user: AccountUser,
            })
        }
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
}
module.exports = signUp
