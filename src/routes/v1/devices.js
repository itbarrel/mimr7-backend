const express = require('express')

const router = express.Router()
const devicesController = require('../../controllers/v1/devices')
const validate = require('../../middlewares/validate')

const { generalValidations, deviceValidations } = require('../../validations')

router.get('/', validate(generalValidations.allResources), devicesController.all)

router.post('/', validate(deviceValidations.deviceObj), devicesController.create)

router.get('/:id', validate(generalValidations.getResource), devicesController.show)

router.put('/:id', validate(generalValidations.getResource), devicesController.update)

router.delete('/:id', validate(generalValidations.getResource), devicesController.destroy)

module.exports = router
