const express = require('express')

const router = express.Router()
const studentsController = require('../../controllers/v1/Students')
const validate = require('../../middlewares/validate')

const { generalValidations, studentValidations } = require('../../validations')

router.get('/', validate(generalValidations.allResources), studentsController.all)

router.get('/klass/:id', validate(generalValidations.allResources), studentsController.getAllStudent)

router.get('/messageSchedules', studentsController.messageSchedule)

router.post('/', validate(studentValidations.studentObj), studentsController.create)

router.get('/:id', validate(generalValidations.getResource), studentsController.show)

router.put('/:id', validate(generalValidations.getResource), studentsController.update)

router.delete('/:id', validate(generalValidations.getResource), studentsController.destroy)

module.exports = router
