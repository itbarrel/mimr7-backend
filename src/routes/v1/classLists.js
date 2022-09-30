const express = require('express')

const router = express.Router()
const classListsController = require('../../controllers/v1/classLists')
const validate = require('../../middlewares/validate')

const { generalValidations, classListValidations } = require('../../validations')

router.get('/', validate(generalValidations.allResources), classListsController.all)

router.post('/', validate(classListValidations.classListObj), classListsController.create)

router.get('/:id', validate(generalValidations.getResource), classListsController.show)

router.put('/:id', validate(generalValidations.getResource), classListsController.update)

router.delete('/:id', validate(generalValidations.getResource), classListsController.destroy)

module.exports = router
