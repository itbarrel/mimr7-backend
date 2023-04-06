const express = require('express')

const router = express.Router()
const MessageSchedulesController = require('../../controllers/v1/messageSchedules')
const validate = require('../../middlewares/validate')

const { generalValidations } = require('../../validations')

router.get('/', validate(generalValidations.allResources), MessageSchedulesController.all)

router.get('/details', MessageSchedulesController.show)

module.exports = router
