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
        const classes = await ClassListScheduleService.findByQuery({ active: true }, false)
        if (classes) {
            classes.map(async (klass) => {
                const { ContentId, ClassListId } = klass
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
cron.schedule('  5 24 * * *', async () => {
    jobQueue.push(async () => {
        const classes = await ClassListScheduleService.findByQuery({ active: true }, false)
        if (classes) {
            classes.map(async (klass) => {
                const { dataValues } = klass
                const klassEndingDate = klass.endDate
                const klassendDate = klassEndingDate.getDate()
                const KlassendMounth = klassEndingDate.getMonth()
                const getCurrentDate = new Date()
                const currentDate = getCurrentDate.getDate()
                const currentMounth = getCurrentDate.getMonth()
                if (klassendDate < currentDate && (KlassendMounth === currentMounth || KlassendMounth < currentMounth)) {
                    dataValues.active = false
                    await ClassListScheduleService.update(dataValues, { id: dataValues.id })

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
