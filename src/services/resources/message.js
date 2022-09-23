const models = require('../../models')
const ResourceService = require('./resource')

class MessageService extends ResourceService {
    constructor() {
        super(models.Message)
    }

}

module.exports = new MessageService()
