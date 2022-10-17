const express = require('express')

const router = express.Router()
const dynamicFormsController = require('../../controllers/v1/dynamicForms')
const validate = require('../../middlewares/validate')

const { generalValidations, dynamicFormValidations } = require('../../validations')

router.get('/', validate(generalValidations.allResources), dynamicFormsController.all)

router.post('/', validate(dynamicFormValidations.dynamicFormObj), dynamicFormsController.create)

router.get('/:id', validate(generalValidations.getResource), dynamicFormsController.show)

router.put('/:id', validate(generalValidations.getResource), dynamicFormsController.update)

router.delete('/:id', validate(generalValidations.getResource), dynamicFormsController.destroy)

module.exports = router
