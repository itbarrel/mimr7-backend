const models = require('../../models')
const ResourceService = require('./resource')

class GptHighlightService extends ResourceService {
    constructor() {
        super(models.GptHighlight)
    }

    async max(attr) {
        const max = await this.model.max(attr)
        return max
    }
}

module.exports = new GptHighlightService()
