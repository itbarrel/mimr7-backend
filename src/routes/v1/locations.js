const express = require('express')

const router = express.Router()
const locationsController = require('../../controllers/v1/locaations')
const validate = require('../../middlewares/validate')

const { generalValidations, locationValidations } = require('../../validations')

router.get('/', validate(generalValidations.allResources), locationsController.all)

router.post('/', validate(locationValidations.locationObj), locationsController.create)

router.get('/:id', validate(generalValidations.getResource), locationsController.show)

router.put('/:id', validate(generalValidations.getResource), locationsController.update)

router.delete('/:id', validate(generalValidations.getResource), locationsController.destroy)

module.exports = router
