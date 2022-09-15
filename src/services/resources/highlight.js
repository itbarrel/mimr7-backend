const models = require('../../models')
const ResourceService = require('./resource')

class HighlightService extends ResourceService {
    constructor() {
        super(models.Highlight)
    }
}

module.exports = new HighlightService()
