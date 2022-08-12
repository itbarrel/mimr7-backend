const models = require('../../models')
const ResourceService = require('./resource')

class CollectionLibraryService extends ResourceService {
    constructor() {
        super(models.CollectionLibrary)
    }
}

module.exports = new CollectionLibraryService()
