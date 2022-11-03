const express = require('express')

const router = express.Router()
const contentLibrariesController = require('../../controllers/v1/contentLibraries')
const validate = require('../../middlewares/validate')

const { generalValidations, contentLibraryValidations } = require('../../validations')

router.get('/', validate(generalValidations.allResources), contentLibrariesController.all)

router.post('/', validate(contentLibraryValidations.contentLibraryObj), contentLibrariesController.create)

router.get('/:id', validate(generalValidations.getResource), contentLibrariesController.show)

router.put('/:id', validate(generalValidations.getResource), contentLibrariesController.update)

router.delete('/:id', validate(generalValidations.getResource), contentLibrariesController.destroy)

module.exports = router
