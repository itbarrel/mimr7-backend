const express = require('express')

const router = express.Router()

const authRoute = require('./auth')
const accountRoute = require('./accounts')
const roleRoute = require('./roles')
const userRoute = require('./users')
const organizationRoute = require('./organizations')
const collectionRoute = require('./collections')
const collectionLibrariesRoute = require('./collectionLibraries')
const highlightRoute = require('./highlights')
const highlightLibrariesRoute = require('./highlightLibraries')
const playersRoute = require('./players')
const locationsRoute = require('./locations')

const verifyToken = require('../../middlewares/verifyToken')

const routes = [
    { path: '/auth', routes: [authRoute] },
    { path: '/accounts', routes: [verifyToken, accountRoute] },
    { path: '/roles', routes: [verifyToken, roleRoute] },
    { path: '/users', routes: [verifyToken, userRoute] },
    { path: '/organizations', routes: [verifyToken, organizationRoute] },
    { path: '/collections', routes: [verifyToken, collectionRoute] },
    { path: '/collectionLibraries', routes: [verifyToken, collectionLibrariesRoute] },
    { path: '/highlights', routes: [verifyToken, highlightRoute] },
    { path: '/highlightLibraries', routes: [verifyToken, highlightLibrariesRoute] },
    { path: '/players', routes: [verifyToken, playersRoute] },
    { path: '/locations', routes: [verifyToken, locationsRoute] },

]

routes.forEach((route) => {
    router.use(route.path, ...route.routes)
})

module.exports = router
