const express = require('express')

const router = express.Router()
const klassSchedulesController = require('../../controllers/v1/klassSchedules')
const validate = require('../../middlewares/validate')

const { generalValidations } = require('../../validations')

router.get('/', validate(generalValidations.allResources), klassSchedulesController.all)

router.post('/', klassSchedulesController.create)

router.get('/complete', klassSchedulesController.complete)

router.get('/:id/students', klassSchedulesController.students)

router.get('/:id', validate(generalValidations.getResource), klassSchedulesController.show)

router.put('/:id', validate(generalValidations.getResource), klassSchedulesController.update)

router.delete('/:id', validate(generalValidations.getResource), klassSchedulesController.destroy)

module.exports = router
