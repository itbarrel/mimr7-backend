const { RoleService } = require('../index')

const Roles = [{
    name: 'SuperAdmin',
    default: true,
}, {
    name: 'Admin',
    default: true,
},
{
    name: 'Manager',
    default: true,
}]

const create = async () => Promise.all(Roles.map(async (role) => {
    await RoleService.create(role)
}))

const destroy = async () => RoleService.delete()

module.exports = { create, destroy }
