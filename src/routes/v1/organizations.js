const express = require('express')

const router = express.Router()
const organizationsController = require('../../controllers/v1/organizations')
const validate = require('../../middlewares/validate')

const { generalValidations, organizationValidations } = require('../../validations')

router.get('/', validate(generalValidations.allResources), organizationsController.all)

router.post('/', validate(organizationValidations.organizationObj), organizationsController.create)

router.get('/:id', validate(generalValidations.getResource), organizationsController.show)

router.put('/:id', validate(generalValidations.getResource), organizationsController.update)

router.delete('/:id', validate(generalValidations.getResource), organizationsController.destroy)

module.exports = router
