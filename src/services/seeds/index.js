module.exports = {}

const RoleSeeder = require('./role')
const UserSeeder = require('./user')

const create = async () => {
    await RoleSeeder.create()
    await UserSeeder.create()
}

const destroy = async () => {
    await RoleSeeder.destroy()
    await UserSeeder.destroy()
}

module.exports = { create, destroy }
