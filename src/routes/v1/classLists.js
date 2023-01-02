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

router.post('/:id/students', validate(generalValidations.getResource), classListsController.addStudent)

router.delete('/:id/students/:studentId', validate(generalValidations.getResource), classListsController.removeStudent)

router.post('/:id/contents', validate(generalValidations.getResource), classListsController.addContent)

router.delete('/:id/contents/:contentId', validate(generalValidations.getResource), classListsController.removeContent)
module.exports = router
