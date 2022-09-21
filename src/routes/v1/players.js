const express = require('express')

const router = express.Router()
const playersController = require('../../controllers/v1/players')
const validate = require('../../middlewares/validate')

const { generalValidations, playerValidations } = require('../../validations')

router.get('/', validate(generalValidations.allResources), playersController.all)

router.post('/', validate(playerValidations.playerObj), playersController.create)

router.get('/:id', validate(generalValidations.getResource), playersController.show)

router.put('/:id', validate(generalValidations.getResource), playersController.update)

router.delete('/:id', validate(generalValidations.getResource), playersController.destroy)

module.exports = router
