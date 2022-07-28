const express = require('express')

const router = express.Router()
const authController = require('../../controllers/v1/auth')
const verifyToken = require('../../middlewares/verifyToken')

router.post('/login', authController.login)
router.post('/forgetpassword', authController.forgetpassword)
router.post('/resetpassword', authController.resetPassword)
router.post('/changepassword', verifyToken, authController.changepassword)

module.exports = router
