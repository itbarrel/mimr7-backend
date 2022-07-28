const express = require('express')

const router = express.Router()
const rolesController = require('../../controllers/v1/roles')
const validate = require('../../middlewares/validate')

const { generalValidations, roleValidations } = require('../../validations')

router.get('/', validate(generalValidations.allResources), rolesController.all)

router.post('/', validate(roleValidations.roleObj), rolesController.create)

router.get('/:id', validate(generalValidations.getResource), rolesController.show)

router.put('/:id', validate(generalValidations.getResource), rolesController.update)

router.delete('/:id', validate(generalValidations.getResource), rolesController.destroy)

module.exports = router
