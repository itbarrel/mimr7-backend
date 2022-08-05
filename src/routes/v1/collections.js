const express = require('express')

const router = express.Router()
const collectionsController = require('../../controllers/v1/collections')
const validate = require('../../middlewares/validate')

const { generalValidations, collectionValidations } = require('../../validations')

router.get('/', validate(generalValidations.allResources), collectionsController.all)

router.post('/', validate(collectionValidations.collectionObj), collectionsController.create)

router.get('/:id', validate(generalValidations.getResource), collectionsController.show)

router.put('/:id', validate(generalValidations.getResource), collectionsController.update)

router.delete('/:id', validate(generalValidations.getResource), collectionsController.destroy)

module.exports = router
