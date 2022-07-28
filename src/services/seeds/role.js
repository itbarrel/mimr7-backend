const { RoleService } = require('../index')

const AdminRole = {
    name: 'Admin',
    value: 'admin',
    default: true,
}

const create = async () => RoleService.create(AdminRole)

const destroy = async () => RoleService.delete(AdminRole)

module.exports = { create, destroy }
