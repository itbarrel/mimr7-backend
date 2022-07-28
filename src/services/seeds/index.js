module.exports = {}

const RoleSeeder = require('./role')

const create = async () => {
    await RoleSeeder.create()
}

const destroy = async () => {
    await RoleSeeder.destroy()
}

module.exports = { create, destroy }
