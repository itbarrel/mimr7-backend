const express = require('express')

const router = express.Router()
const accountsController = require('../../controllers/v1/accounts')
const validate = require('../../middlewares/validate')

const { generalValidations, accountValidations } = require('../../validations')

router.get('/', validate(generalValidations.allResources), accountsController.all)

router.post('/', validate(accountValidations.accountObj), accountsController.create)

router.get('/:id', validate(generalValidations.getResource), accountsController.show)

router.put('/:id', validate(generalValidations.getResource), accountsController.update)

router.delete('/:id', validate(generalValidations.getResource), accountsController.destroy)

module.exports = router
