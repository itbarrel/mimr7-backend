const express = require('express')

const router = express.Router()
const collectionLibrariesController = require('../../controllers/v1/collectionLibraries')
const validate = require('../../middlewares/validate')

const { generalValidations, collectionLibraryValidations } = require('../../validations')

router.get('/', validate(generalValidations.allResources), collectionLibrariesController.all)

router.post('/', validate(collectionLibraryValidations.collectionLibraryObj), collectionLibrariesController.create)

router.get('/:id', validate(generalValidations.getResource), collectionLibrariesController.show)

router.put('/:id', validate(generalValidations.getResource), collectionLibrariesController.update)

router.delete('/:id', validate(generalValidations.getResource), collectionLibrariesController.destroy)

module.exports = router
