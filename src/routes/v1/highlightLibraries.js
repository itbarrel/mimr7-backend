const express = require('express')

const router = express.Router()
const highlightLibrariesController = require('../../controllers/v1/highlightLibraries')
const validate = require('../../middlewares/validate')

const { generalValidations, highlightLibraryValidations } = require('../../validations')

router.get('/', validate(generalValidations.allResources), highlightLibrariesController.all)

router.post('/', validate(highlightLibraryValidations.highlightLibraryObj), highlightLibrariesController.create)

router.get('/:id', validate(generalValidations.getResource), highlightLibrariesController.show)

router.put('/:id', validate(generalValidations.getResource), highlightLibrariesController.update)

router.delete('/:id', validate(generalValidations.getResource), highlightLibrariesController.destroy)

module.exports = router
