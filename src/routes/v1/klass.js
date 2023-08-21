const express = require('express')

const router = express.Router()
const klassController = require('../../controllers/v1/klass')
const validate = require('../../middlewares/validate')

const { generalValidations, klassValidations } = require('../../validations')

router.get('/', validate(generalValidations.allResources), klassController.all)

router.post('/', validate(klassValidations.klassObj), klassController.create)

router.get('/:id', validate(generalValidations.getResource), klassController.show)

router.put('/:id', validate(generalValidations.getResource), klassController.update)

router.delete('/:id', validate(generalValidations.getResource), klassController.destroy)

router.post('/:id/students', validate(generalValidations.getResource), klassController.addStudent)

router.delete('/:id/students', validate(generalValidations.getResource), klassController.removeStudent)

router.post('/:id/contents', validate(generalValidations.getResource), klassController.addContent)

router.delete('/:id/contents', validate(generalValidations.getResource), klassController.removeContent)
module.exports = router
