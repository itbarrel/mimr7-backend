const express = require('express')

const router = express.Router()

const authRoute = require('./auth')
const accountRoute = require('./accounts')
const roleRoute = require('./roles')
const userRoute = require('./users')
const organizationRoute = require('./organizations')
const contentRoute = require('./contents')
const contentLibrariesRoute = require('./contentLibraries')
const highlightRoute = require('./highlights')
const highlightLibrariesRoute = require('./highlightLibraries')
const playersRoute = require('./players')
const locationsRoute = require('./locations')
const messageRoute = require('./messages')
const klassRoute = require('./klass')
const dynamicFormRoute = require('./dynamicForms')
const contentPlanTemplateRoute = require('./contentPlanTemplate')
const studentRoute = require('./students')
const klassScheduleRoute = require('./klassSchdules')
const messageScheduleRoute = require('./messageSchedule')
const messageScheduleAnswerRoute = require('./messageScheduleAnswer')

const verifyToken = require('../../middlewares/verifyToken')

const routes = [
    { path: '/auth', routes: [authRoute] },
    { path: '/accounts', routes: [verifyToken, accountRoute] },
    { path: '/roles', routes: [verifyToken, roleRoute] },
    { path: '/users', routes: [verifyToken, userRoute] },
    { path: '/organizations', routes: [verifyToken, organizationRoute] },
    { path: '/contents', routes: [verifyToken, contentRoute] },
    { path: '/contentLibraries', routes: [verifyToken, contentLibrariesRoute] },
    { path: '/highlights', routes: [verifyToken, highlightRoute] },
    { path: '/highlightLibraries', routes: [verifyToken, highlightLibrariesRoute] },
    { path: '/players', routes: [verifyToken, playersRoute] },
    { path: '/locations', routes: [verifyToken, locationsRoute] },
    { path: '/messages', routes: [verifyToken, messageRoute] },
    { path: '/klasses', routes: [verifyToken, klassRoute] },
    { path: '/dynamicForms', routes: [verifyToken, dynamicFormRoute] },
    { path: '/contentPlanTemplates', routes: [verifyToken, contentPlanTemplateRoute] },
    { path: '/students', routes: [verifyToken, studentRoute] },
    { path: '/klassSchedules', routes: [verifyToken, klassScheduleRoute] },
    { path: '/messageSchedules', routes: [verifyToken, messageScheduleRoute] },
    { path: '/messageScheduleAnswers', routes: [verifyToken, messageScheduleAnswerRoute] },

]

routes.forEach((route) => {
    router.use(route.path, ...route.routes)
})

module.exports = router
