const express = require('express')

const router = express.Router()

const authRoute = require('./auth')
const accountRoute = require('./accounts')
const roleRoute = require('./roles')
const userRoute = require('./users')
const deviceRoute = require('./devices')

const verifyToken = require('../../middlewares/verifyToken')

const routes = [
    { path: '/auth', routes: [authRoute] },
    { path: '/accounts', routes: [accountRoute] },
    { path: '/roles', routes: [verifyToken, roleRoute] },
    { path: '/users', routes: [verifyToken, userRoute] },
    { path: '/devices', routes: [verifyToken, deviceRoute] },

]

routes.forEach((route) => {
    router.use(route.path, ...route.routes)
})

module.exports = router
