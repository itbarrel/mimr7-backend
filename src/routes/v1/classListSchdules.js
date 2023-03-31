const express = require('express')

const router = express.Router()
const classListSchedulesController = require('../../controllers/v1/classListSchedules')
const validate = require('../../middlewares/validate')

const { generalValidations } = require('../../validations')

router.get('/', validate(generalValidations.allResources), classListSchedulesController.all)

router.post('/', classListSchedulesController.create)

router.get('/:id', validate(generalValidations.getResource), classListSchedulesController.show)

router.put('/:id', validate(generalValidations.getResource), classListSchedulesController.update)

router.delete('/:id', validate(generalValidations.getResource), classListSchedulesController.destroy)

module.exports = router
