const { Op } = require('sequelize')
const { StudentService, KlassService } = require('../../../services/resources')

const all = async (req, res) => {
    try {
        const {
            offset, limit, sort, ...query
        } = req.query

        const { docs, pages, total } = await StudentService.all(
            query,
            offset,
            limit,
            sort,
        )

        res.status(200).send({ data: docs, pages, total })
    } catch (error) {
        res.status(400).send(error)
    }
}
const getAllStudent = async (req, res) => {
    try {
        const { id } = req.params
        const klass = await KlassService.findById(id)

        const students = await klass.getStudents()
        const Ids = students.map((student) => student.id)
        const { docs: student } = await StudentService.all({
            id: { [Op.notIn]: Ids },
        })

        res.status(200).send({ student })
    } catch (error) {
        res.status(400).send(error)
    }
}

const create = async (req, res) => {
    try {
        const student = await StudentService.create(req.body)
        student
            ? res.status(201).send({ student })
            : res.status(400).send({ message: 'Student is not created' })
    } catch (error) {
        res.status(400).send(error)
    }
}

const show = async (req, res) => {
    try {
        const { id } = req.params
        const student = await StudentService.findById(id)
        student
            ? res.status(200).send({ student })
            : res.status(400).send({ message: 'Student not found' })
    } catch (error) {
        res.status(400).send(error)
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params
        const student = await StudentService.update(req.body, { id })
        student
            ? res.status(200).send({ student })
            : res.status(400).send({ message: 'Student is not updated' })
    } catch (error) {
        res.status(400).send(error)
    }
}

const destroy = async (req, res) => {
    try {
        const { id } = req.params
        await StudentService.delete({ id })
        res.status(200).send({ message: 'student is deleted' })
    } catch (error) {
        res.status(400).send(error)
    }
}

module.exports = {
    all,
    create,
    show,
    update,
    destroy,
    getAllStudent,
}
