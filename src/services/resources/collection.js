const models = require('../../models')
const ResourceService = require('./resource')

class CollectionService extends ResourceService {
    constructor() {
        super(models.Collection)
    }
}

module.exports = new CollectionService()
