const express = require('express')

const router = express.Router()
const ContentsController = require('../../controllers/v1/contents')
const validate = require('../../middlewares/validate')

const { generalValidations, contentValidations } = require('../../validations')

router.get('/', validate(generalValidations.allResources), ContentsController.all)

router.post('/', validate(contentValidations.contentObj), ContentsController.create)

router.get('/:id', validate(generalValidations.getResource), ContentsController.show)

router.put('/:id', validate(generalValidations.getResource), ContentsController.update)

router.delete('/:id', validate(generalValidations.getResource), ContentsController.destroy)

module.exports = router
