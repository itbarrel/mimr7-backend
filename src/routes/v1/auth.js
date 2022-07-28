const express = require('express')

const router = express.Router()
const authController = require('../../controllers/v1/auth')

router.post('/login', authController.login)
router.post('/forgetpassword', authController.forgetpassword)
router.post('/resetpassword', authController.resetPassword)

module.exports = router
