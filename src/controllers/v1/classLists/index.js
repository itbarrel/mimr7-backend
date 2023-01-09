const { ClassListService, StudentService, ContentService } = require('../../../services/resources')

const all = async (req, res, next) => {
    try {
        const {
            offset, limit, sort, ...query
        } = req.query

        const { docs, pages, total } = await ClassListService.all(query, offset, limit, sort)

        res.send({ data: docs, pages, total })
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const classList = await ClassListService.create(req.body)
        res.send({ classList })
    } catch (error) {
        next(error)
    }
}

const show = async (req, res, next) => {
    try {
        const { id } = req.params
        const { docs: classList } = await ClassListService.all({ id })
        res.send({ classList })
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const { id } = req.params
        const classList = await ClassListService.update(req.body, { id })
        res.send(classList)
    } catch (error) {
        next(error)
    }
}

const destroy = async (req, res, next) => {
    try {
        const { id } = req.params
        await ClassListService.delete({ id })
        res.send({ message: 'classList is deleted' })
    } catch (error) {
        next(error)
    }
}
const addStudent = async (req, res, next) => {
    try {
        const { id } = req.params
        const { students } = req.body
        const classList = await ClassListService.findById(id)
        if (!classList) {
            res.send({ message: 'Class Not Found' })
        }

        const messages = await Promise.all(
            students.map(async (studentId) => {
                return new Promise(async (resolve, reject) => {
                    const newStudent = await StudentService.findById(studentId)
                    if (!newStudent) {
                        resolve({ message: 'Student Not Found' })
                    }
                    const exitsStudent = await classList.hasStudent(newStudent)
                    if (exitsStudent) {
                        resolve({ message: 'Student Already added' })

                    } else {
                        await classList.addStudent(newStudent)
                        resolve({
                            message: `Student with id ${newStudent.id}  added succesfully`
                        })
                    }
                })
            })
        )
        res.send({ messages })

    } catch (error) {
        next(error)
    }
}
const removeStudent = async (req, res, next) => {
    try {
        const { id, studentId } = req.params
        const classList = await ClassListService.findById(id)
        const student = await StudentService.findById(studentId)
        await classList.removeStudent(student)
        res.send({ message: 'Student Removed Successfully' })
    } catch (error) {
        next(error)
    }
}
const addContent = async (req, res, next) => {
    try {
        const { id } = req.params
        const { contents } = req.body
        contents.map(async (content) => {
            const classList = await ClassListService.findById(id)
            const newcontent = await ContentService.findById(content.id)
            await classList.addContent(newcontent)
        })
        res.send({ message: 'Content Added Successfully' })
    } catch (error) {
        next(error)
    }
}
const removeContent = async (req, res, next) => {
    try {
        const { id, contentId } = req.params
        const classList = await ClassListService.findById(id)
        const content = await ContentService.findById(contentId)
        await classList.removeContent(content)
        res.send({ message: 'Content Removed Successfully' })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    all, create, show, update, destroy, addStudent, removeStudent, addContent, removeContent,
}
