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
                const findMessageSchedule =
                    await MessageScheduleService.findByQuery({ StudentId: student.id, MessageId: randomMsaage.id }, false)
                const { name } = randomMsaage
                const generatedhash = hashGenerator(32)
                const messageScheduleObj = {
                    MessageId: randomMsaage.id,
                    StudentId: student.id,
                    AccountId: account.id,
                    hash: generatedhash,
                    count: 1,
                }
                if (!findMessageSchedule || findMessageSchedule && findMessageSchedule.length <= 4) {
                    const messageSchedule = await MessageScheduleService.create(messageScheduleObj)
                    if (messageSchedule) {
                        await student.messageEmail(content.title, messageSchedule.hash)
                    }
                }
            })
        }
    })
    jobQueue.start((err) => {
        if (err) throw err
    })
}, {
    scheduled: true,
    timezone: 'Asia/Karachi'
})
