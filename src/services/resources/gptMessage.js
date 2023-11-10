const models = require('../../models')
const ResourceService = require('./resource')

class GptMessageService extends ResourceService {
    constructor() {
        super(models.GptMessage)
    }

    async max(attr) {
        const max = await this.model.max(attr)
        return max
    }
}

module.exports = new GptMessageService()
