const { UserService, RoleService } = require('../index')

const create = async () => {
    const role = await RoleService.findByQuery({ name: 'SuperAdmin' })
    const SuperAdmin = {
        userName: 'SuperAdmin',
        firstName: 'SuperAdmin',
        email: 'superadmin@mimr7.com',
        password: 'superadmin123',
        RoleId: role.id,
        AccountId: null,
        default: true,
    }

    await UserService.create(SuperAdmin)
}

const destroy = async () => UserService.delete({})

module.exports = { create, destroy }
