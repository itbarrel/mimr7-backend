const cron = require('node-cron')
const queue = require('../queue')

const jobQueue = queue({ results: [] })
const {
    ClassListScheduleService, MessageService,
    AccountService, ClassListService,
    MessageScheduleService, ContentService,
} = require('../services/resources')

const hashGenerator = require('../utils/hashGenerator')

cron.schedule('  0 8-22 * * *', async () => {
    jobQueue.push(async () => {
        const classes = await ClassListScheduleService.findByQuery({ active: true })
        if (classes) {
            const { ContentId, ClassListId } = classes
            const messages = await MessageService.findByQuery({ ContentId }, false)
            const classList = await ClassListService.findByQuery({ id: ClassListId })
            const content = await ContentService.findById(ContentId)
            const account = await AccountService.findById(content.AccountId)

            const students = await classList.getStudents()
            students.map(async (student) => {
                const randomIndex = Math.floor(Math.random() * messages.length)
                const randomMsaage = messages[randomIndex]
                const findMessageSchedule = await MessageScheduleService.findByQuery({ StudentId: student.id, MessageId: randomMsaage.id })
                const { name } = randomMsaage
                if (!findMessageSchedule) {
                    const generatedhash = hashGenerator(32)
                    const messageScheduleObj = {
                        MessageId: randomMsaage.id,
                        StudentId: student.id,
                        AccountId: account.id,
                        hash: generatedhash,
                        count: 1,
                    }
                    const messageSchedule = await MessageScheduleService.create(messageScheduleObj)
                    if (messageSchedule) {
                        await student.messageEmail(name, content.title, messageSchedule.hash)
                    }
                }
                if (findMessageSchedule && findMessageSchedule.count <= 4) {
                    const { dataValues: updateObj, id } = findMessageSchedule
                    updateObj.count += 1
                    const messageSchedule = await MessageScheduleService.update(updateObj, { id })
                    if (messageSchedule) {
                        await student.messageEmail(name, content.title, messageSchedule.hash)
                    }
                }
            })
        }
    })
    jobQueue.start((err) => {
        if (err) throw err
    })
})
