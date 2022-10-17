const { DynamicFormService } = require('../../../services/resources')

const all = async (req, res, next) => {
    try {
        const {
            offset, limit, sort, ...query
        } = req.query

        const { docs, pages, total } = await DynamicFormService.all(query, offset, limit, sort)

        res.send({ data: docs, pages, total })
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const dynamicForm = await DynamicFormService.create(req.body)
        res.send({ dynamicForm })
    } catch (error) {
        next(error)
    }
}

const show = async (req, res, next) => {
    try {
        const { id } = req.params
        const dynamicForm = await DynamicFormService.findById(id)
        res.send({ dynamicForm })
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const { id } = req.params
        console.log('>>.')
        const dynamicForm = await DynamicFormService.update(req.body, { id })
        res.send(dynamicForm)
    } catch (error) {
        next(error)
    }
}

const destroy = async (req, res, next) => {
    try {
        const { id } = req.params
        await DynamicFormService.delete({ id })
        res.send({ message: 'dynamicForm is deleted' })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    all, create, show, update, destroy,
}
