const express = require('express')

const router = express.Router()
const usersController = require('../../controllers/v1/users')
const validate = require('../../middlewares/validate')

const { generalValidations, userValidations } = require('../../validations')

router.get('/', validate(generalValidations.allResources), usersController.all)

router.post('/', validate(userValidations.userObj), usersController.create)

router.get('/:id', validate(generalValidations.getResource), usersController.show)

router.put('/:id', validate(generalValidations.getResource), usersController.update)

router.delete('/:id', validate(generalValidations.getResource), usersController.destroy)

module.exports = router
