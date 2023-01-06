const { Op } = require('sequelize')
const { StudentService, ClassListService } = require('../../../services/resources')

const all = async (req, res, next) => {
    try {
        const {
            offset, limit, sort, ...query
        } = req.query

        const { docs, pages, total } = await StudentService.all(query, offset, limit, sort)

        res.send({ data: docs, pages, total })
    } catch (error) {
        next(error)
    }
}
const getAllStudent = async (req, res, next) => {
    try {
        const { id } = req.params
        const classList = await ClassListService.findById(id)

        const students = await classList.getStudents()
        const Ids = students.map((student) => student.id)
        const { docs: student } = await StudentService.all({ id: { [Op.notIn]: Ids } })

        res.send({ student })
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const student = await StudentService.create(req.body)
        res.send({ student })
    } catch (error) {
        next(error)
    }
}

const show = async (req, res, next) => {
    try {
        const { id } = req.params
        const student = await StudentService.findById(id)
        res.send({ student })
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const { id } = req.params
        const student = await StudentService.update(req.body, { id })
        res.send(student)
    } catch (error) {
        next(error)
    }
}

const destroy = async (req, res, next) => {
    try {
        const { id } = req.params
        await StudentService.delete({ id })
        res.send({ message: 'student is deleted' })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    all, create, show, update, destroy, getAllStudent,
}
