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
        } else {
            const messages = await Promise.all(
                students.map(async (studentId) => new Promise(async (resolve) => {
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
                            message: `Student with id ${newStudent.id}  added succesfully`,
                        })
                    }
                })),
            )
            res.send({ messages })
        }
    } catch (error) {
        next(error)
    }
}
const removeStudent = async (req, res, next) => {
    try {
        const { id } = req.params
        const { students } = req.body

        const classList = await ClassListService.findById(id)
        if (!classList) {
            res.send({ message: 'Class Not Found' })
        } else {
            const response = await Promise.all(
                students.map(async (studentId) => new Promise(async (resolve) => {
                    const findStudent = await StudentService.findById(studentId)
                    if (!findStudent) {
                        resolve({ message: 'Student Not Found' })
                    } else {
                        await classList.removeStudent(findStudent)
                        resolve({ message: `Student with Id ${findStudent.id} Deleted Successfully` })
                    }
                })),
            )
            res.send({ response })
        }
    } catch (error) {
        next(error)
    }
}
const addContent = async (req, res, next) => {
    try {
        const { id } = req.params
        const { contents } = req.body
        const classList = await ClassListService.findById(id)
        if (!classList) {
            res.send({ message: 'Class Not Found' })
        } else {
            const messages = await Promise.all(
                contents.map(async (contentId) => new Promise(async (resolve) => {
                    const newContent = await ContentService.findById(contentId)
                    if (!newContent) {
                        resolve({ message: 'Content Not Found' })
                    }
                    const exitsContent = await classList.hasContent(newContent)
                    if (exitsContent) {
                        resolve({ message: 'Content Already added' })
                    } else {
                        await classList.addContent(newContent)
                        resolve({
                            message: `Content with id ${newContent.id}  added succesfully`,
                        })
                    }
                })),
            )
            res.send({ messages })
        }
    } catch (error) {
        next(error)
    }
}
const removeContent = async (req, res, next) => {
    try {
        const { id } = req.params
        const { contents } = req.body

        const classList = await ClassListService.findById(id)
        if (!classList) {
            res.send({ message: 'Class Not Found' })
        } else {
            const response = await Promise.all(
                contents.map(async (contentId) => new Promise(async (resolve) => {
                    const findcontent = await ContentService.findById(contentId)
                    if (!findcontent) {
                        resolve({ message: 'Content Not Found' })
                    } else {
                        await classList.removeContent(findcontent)
                        resolve({ message: `Content with Id ${findcontent.id} Deleted Successfully` })
                    }
                })),
            )
            res.send({ response })
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    all, create, show, update, destroy, addStudent, removeStudent, addContent, removeContent,
}
