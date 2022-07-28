const models = require('../../models')
const ResourceService = require('./resource')

class DeviceService extends ResourceService {
    constructor() {
        super(models.Device)
    }
}

module.exports = new DeviceService()
