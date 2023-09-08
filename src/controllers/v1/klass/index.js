const {
    KlassService,
    StudentService,
    ContentService,
} = require('../../../services/resources')

const all = async (req, res, next) => {
    try {
        const {
            offset, limit, sort, ...query
        } = req.query

        const { docs, pages, total } = await KlassService.all(
            query,
            offset,
            limit,
            sort,
        )

        res.send({ data: docs, pages, total })
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const klass = await KlassService.create(req.body)
        res.send({ klass })
    } catch (error) {
        next(error)
    }
}

const show = async (req, res, next) => {
    try {
        const { id } = req.params
        const { docs: klass } = await KlassService.all({ id })
        res.send({ klass })
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const { id } = req.params
        const klass = await KlassService.update(req.body, { id })
        res.send(klass)
    } catch (error) {
        next(error)
    }
}

const destroy = async (req, res, next) => {
    try {
        const { id } = req.params
        await KlassService.delete({ id })
        res.send({ message: 'klass is deleted' })
    } catch (error) {
        next(error)
    }
}
const addStudent = async (req, res, next) => {
    try {
        const { id } = req.params
        const { students } = req.body
        const klass = await KlassService.findById(id)
        if (!klass) {
            res.send({ message: 'Class Not Found' })
        } else {
            // eslint-disable-next-line no-async-promise-executor
            const messages = await Promise.all(
                students.map(
                    async (studentId) => new Promise(async (resolve) => {
                        const findStudent = await StudentService.findById(studentId)
                        if (!findStudent) {
                            resolve({ message: 'Student Not Found' })
                        }
                        const exitsStudent = await klass.hasStudent(findStudent)
                        if (exitsStudent) {
                            resolve({ message: 'Student Already added' })
                        } else {
                            const newStudent = await klass.addStudent(findStudent)
                            if (newStudent) {
                                resolve({
                                    message: `Student with id ${findStudent.id}  added succesfully`,
                                })
                            }
                        }
                    }),
                ),
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

        const klass = await KlassService.findById(id)
        if (!klass) {
            res.send({ message: 'Class Not Found' })
        } else {
            // eslint-disable-next-line no-async-promise-executor
            const response = await Promise.all(
                students.map(
                    async (studentId) => new Promise(async (resolve) => {
                        const findStudent = await StudentService.findById(studentId)
                        if (!findStudent) {
                            resolve({ message: 'Student Not Found' })
                        } else {
                            await klass.removeStudent(findStudent)
                            resolve({
                                message: `Student with Id ${findStudent.id} Deleted Successfully`,
                            })
                        }
                    }),
                ),
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
        const klass = await KlassService.findById(id)
        if (!klass) {
            res.send({ message: 'Class Not Found' })
        } else {
            // eslint-disable-next-line no-async-promise-executor
            const messages = await Promise.all(
                contents.map(
                    async (contentId) => new Promise(async (resolve) => {
                        const findContent = await ContentService.findById(contentId)
                        if (!findContent) {
                            resolve({ message: 'Content Not Found' })
                        }
                        const exitsContent = await klass.hasContent(findContent)
                        if (exitsContent) {
                            resolve({ message: 'Content Already added' })
                        } else {
                            const addAcontent = await klass.addContent(findContent)
                            if (addAcontent) {
                                resolve({
                                    message: `Content with id ${findContent.id}  added succesfully`,
                                })
                            }
                        }
                    }),
                ),
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

        const klass = await KlassService.findById(id)
        if (!klass) {
            res.send({ message: 'Class Not Found' })
        } else {
            const response = await Promise.all(
                // eslint-disable-next-line no-async-promise-executor
                contents.map(
                    async (contentId) => new Promise(async (resolve) => {
                        const findcontent = await ContentService.findById(contentId)
                        if (!findcontent) {
                            resolve({ message: 'Content Not Found' })
                        } else {
                            await klass.removeContent(findcontent)
                            resolve({
                                message: `Content with Id ${findcontent.id} Deleted Successfully`,
                            })
                        }
                    }),
                ),
            )
            res.send({ response })
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    all,
    create,
    show,
    update,
    destroy,
    addStudent,
    removeStudent,
    addContent,
    removeContent,
}
