const models = require('../../models')
const ResourceService = require('./resource')

class MessageScheduleService extends ResourceService {
    constructor() {
        super(models.MessageSchedule)
    }
    async all(query = {}, offset = 1, limit = 20, sort = {}) {
        const sorted = []
        Object.keys(sort).map((key) => sorted.push([key, sort[key]]))
        const options = {
            // offset: offset * (limit + 1),
            where: query,
            page: offset,
            paginate: limit,
            order: sorted,

        }
        return this.model.paginate(options)
    }

}

module.exports = new MessageScheduleService()
