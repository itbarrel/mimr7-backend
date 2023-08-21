const cron = require('node-cron')
const { Op } = require('sequelize')
const queue = require('../queue')

const jobQueue = queue({ results: [] })
const {
    KlassScheduleService,
    MessageService,
    KlassService,
    MessageScheduleService,
    ContentService,
} = require('../services/resources')

const hashGenerator = require('../utils/hashGenerator')

cron.schedule(
    '   0 8-22 * * *',
    async () => {
        jobQueue.push(async () => {
            try {
                const sendMessage = async (arr = [], Contents) => {
                    const contentIds = Contents.map((content) => content.id)

                    const Ids = arr.map((fcmr) => fcmr.MessageId)

                    const messages = await MessageService.findByQuery(
                        {
                            ContentId: {
                                [Op.in]: contentIds,
                            },
                            id: {
                                [Op.notIn]: Ids,
                            },
                        },
                        false,
                    )

                    const randomIndex = Math.floor(Math.random() * messages.length)
                    let message = messages[randomIndex]
                    if (message) {
                        const { title } = await ContentService.findById(message.ContentId)
                        return { message, title }
                    }
                    message = null
                    return message
                }
                const classes = await KlassScheduleService.findByQuery(
                    { active: true },
                    false,
                )

                if (classes.length === 0) return

                classes.map(async (klass) => {
                    const { KlassId } = klass
                    const { Students, Contents } = await KlassService.findByQuery(
                        {
                            id: KlassId,
                        },
                        true,
                        ['id'],
                        ['Students', 'Contents'],
                    )

                    if (klass.sendMessageRandom) {
                        Students.map(async (student) => {
                            // findCompleteMessageScheduleRepeltion
                            const FCMSR = await MessageScheduleService.findall(
                                klass.messageRepetition,
                                student.id,
                                null,
                            )
                            if (FCMSR) {
                                const Comingmessage = await sendMessage(FCMSR, Contents)
                                if (Comingmessage !== null) {
                                    const { message, title } = Comingmessage
                                    const generatedhash = hashGenerator(32)
                                    const messageScheduleObj = {
                                        hash: generatedhash,
                                        count: 1,
                                        MessageId: message.id,
                                        StudentId: student.id,
                                        AccountId: student.AccountId,
                                    }

                                    const messageSchedule = await MessageScheduleService.create(
                                        messageScheduleObj,
                                    )
                                    if (messageSchedule) {
                                        await student.messageEmail(title, messageSchedule.hash)
                                    }
                                } else {
                                    // eslint-disable-next-line no-console
                                    console.log('All Questions are Sended Successfully')
                                }
                            }
                        })
                    } else {
                        const FCMSR = await MessageScheduleService.findall(
                            klass.messageRepetition,
                            null,
                            Students.length,
                        )
                        const Comingmessage = await sendMessage(FCMSR, Contents)
                        if (Comingmessage !== null) {
                            Students.map(async (student) => {
                                const { message, title } = Comingmessage
                                const generatedhash = hashGenerator(32)
                                const messageScheduleObj = {
                                    hash: generatedhash,
                                    count: 1,
                                    MessageId: message.id,
                                    StudentId: student.id,
                                    AccountId: student.AccountId,
                                }

                                const messageSchedule = await MessageScheduleService.create(
                                    messageScheduleObj,
                                )
                                if (messageSchedule) {
                                    await student.messageEmail(title, messageSchedule.hash)
                                }
                            })
                        } else {
                            // eslint-disable-next-line no-console
                            console.log('All Questions are Sended Successfully')
                        }
                    }
                })
            } catch (error) {
                // eslint-disable-next-line no-console
                console.log('error', error)
            }
        })
        jobQueue.start((err) => {
            if (err) throw err
        })
    },
    {
        scheduled: true,
        timezone: 'Asia/Karachi',
    },
)
cron.schedule(
    '  5 0 * * *',
    async () => {
        jobQueue.push(async () => {
            try {
                const classes = await KlassScheduleService.findByQuery(
                    { active: true },
                    false,
                )
                if (classes) {
                    classes.map(async (klass) => {
                        const { dataValues } = klass
                        const klassEndingDate = klass.endDate
                        const klassendDate = klassEndingDate.getDate()
                        const KlassendMounth = klassEndingDate.getMonth()
                        const getCurrentDate = new Date()
                        const currentDate = getCurrentDate.getDate()
                        const currentMounth = getCurrentDate.getMonth()
                        if (
                            klassendDate < currentDate
                            && (KlassendMounth === currentMounth || KlassendMounth < currentMounth)
                        ) {
                            dataValues.active = false
                            await KlassScheduleService.update(dataValues, {
                                id: dataValues.id,
                            })
                        }
                    })
                }
            } catch (error) {
                // eslint-disable-next-line no-console
                console.log('error', error)
            }
        })
        jobQueue.start((err) => {
            if (err) throw err
        })
    },
    {
        scheduled: true,
        timezone: 'Asia/Karachi',
    },
)
