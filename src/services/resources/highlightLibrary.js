const models = require('../../models')
const ResourceService = require('./resource')

class HighlightLibraryService extends ResourceService {
    constructor() {
        super(models.HighlightLibrary)
    }
}

module.exports = new HighlightLibraryService()
