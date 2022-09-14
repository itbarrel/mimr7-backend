const express = require('express')

const router = express.Router()
const highlightsController = require('../../controllers/v1/highlights')
const validate = require('../../middlewares/validate')

const { generalValidations, highlightValidations } = require('../../validations')

router.get('/', validate(generalValidations.allResources), highlightsController.all)

router.post('/', validate(highlightValidations.highlightObj), highlightsController.create)

router.get('/:id', validate(generalValidations.getResource), highlightsController.show)

router.put('/:id', validate(generalValidations.getResource), highlightsController.update)

router.delete('/:id', validate(generalValidations.getResource), highlightsController.destroy)

module.exports = router
