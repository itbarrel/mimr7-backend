const { RoleService } = require('../index')

const SuperAdminRole = {
    name: 'SuperAdmin',
    value: 'superadmin',
    default: true,
}

const create = async () => RoleService.create(SuperAdminRole)

const destroy = async () => RoleService.delete(SuperAdminRole)

module.exports = { create, destroy }
