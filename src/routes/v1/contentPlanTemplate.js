const express = require('express')

const router = express.Router()
const contentplanTemplatesController = require('../../controllers/v1/contentPlanTemplates')
const validate = require('../../middlewares/validate')

const { generalValidations, contentPlantTemplateValidations } = require('../../validations')

router.get('/', validate(generalValidations.allResources), contentplanTemplatesController.all)

router.post('/', validate(contentPlantTemplateValidations.contentPlanTemplateObj), contentplanTemplatesController.create)

router.get('/:id', validate(generalValidations.getResource), contentplanTemplatesController.show)

router.put('/:id', validate(generalValidations.getResource), contentplanTemplatesController.update)

router.delete('/:id', validate(generalValidations.getResource), contentplanTemplatesController.destroy)

module.exports = router
