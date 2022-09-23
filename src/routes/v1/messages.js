const express = require('express')

const router = express.Router()
const MessagesController = require('../../controllers/v1/messages')
const validate = require('../../middlewares/validate')

const { generalValidations, messageValidations } = require('../../validations')

router.get('/', validate(generalValidations.allResources), MessagesController.all)

router.post('/', validate(messageValidations.messageObj), MessagesController.create)

router.get('/:id', validate(generalValidations.getResource), MessagesController.show)

router.put('/:id', validate(generalValidations.getResource), MessagesController.update)

router.delete('/:id', validate(generalValidations.getResource), MessagesController.destroy)

module.exports = router
