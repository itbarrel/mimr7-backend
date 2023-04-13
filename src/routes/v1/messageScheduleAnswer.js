const express = require('express')

const router = express.Router()
const messageScheduleAnswersController = require('../../controllers/v1/messageScheduleAnswers')
const validate = require('../../middlewares/validate')

const { generalValidations, messageScheduleAnswerValidations } = require('../../validations')

router.get('/', validate(generalValidations.allResources), messageScheduleAnswersController.all)

router.post('/', validate(messageScheduleAnswerValidations.messageScheduleAnswerObj), messageScheduleAnswersController.create)

router.get('/:id', validate(generalValidations.getResource), messageScheduleAnswersController.show)

router.put('/:id', validate(generalValidations.getResource), messageScheduleAnswersController.update)

router.delete('/:id', validate(generalValidations.getResource), messageScheduleAnswersController.destroy)

module.exports = router
