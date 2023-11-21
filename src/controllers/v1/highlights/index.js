const { Configuration, OpenAIApi } = require('openai')
const config = require('../../../../config')

const configuration = new Configuration({
    apiKey: config.OPEN_AI_KEY,
})

const openai = new OpenAIApi(configuration)
const { HighlightService, GptMessageService } = require('../../../services/resources')

const all = async (req, res, next) => {
    try {
        const { offset, limit, ...query } = req.query

        const { docs, pages, total } = await HighlightService.all(query, offset, limit)

        res.send({ data: docs, pages, total })
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const highlight = await HighlightService.create(req.body)
        res.send({ highlight })
    } catch (error) {
        next(error)
    }
}

const show = async (req, res, next) => {
    try {
        const { id } = req.params
        const highlight = await HighlightService.findById(id)
        res.send({ highlight })
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const { id } = req.params
        const highlight = await HighlightService.update(req.body, { id })
        res.send(highlight)
    } catch (error) {
        next(error)
    }
}

const destroy = async (req, res, next) => {
    try {
        const { id } = req.params
        await HighlightService.delete({ id })
        res.send({ message: 'highlight is deleted' })
    } catch (error) {
        next(error)
    }
}
const bulkCreate = async (req, res, next) => {
    try {
        const { highlights } = req.body

        const highlight = await HighlightService.bulkcreate(highlights)
        res.send({ highlight })
    } catch (error) {
        next(error)
    }
}

const gptMessages = async (req, res, next) => {
    try {
        const { id } = req.params
        const { content, AccountId } = await HighlightService.findById(id)
        const prompt = `make the question and answer of given highlight ${content} 
        and return question on odd index and answer on even index ###`

        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: ` ${prompt}`,
            max_tokens: 100,
            temperature: 0,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        })
        const data = response.data.choices[0].text.trim().split('\n')
        const messages = []

        let currentObj = {}

        for (const item of data) {
            if (item.startsWith('Q')) {
                // Start a new question-answer pair
                currentObj = { question: item.substring(3).trim() }
            } else if (item.startsWith('A')) {
                // Add the answer to the current question-answer pair
                currentObj.answer = item.substring(3).trim()
                messages.push(currentObj)
            }
        }

        let group = await GptMessageService.max('group')
        // eslint-disable-next-line no-unused-expressions
        Number.isNaN(group) ? group = 1 : group += 1
        Promise.all(messages.map(async (message) => {
            const gptObj = {
                group,
                name: message.question,
                solution: message.answer,
                AccountId,
                HighlightId: id,
            }
            await GptMessageService.create(gptObj)
        }))

        const allGptMessages = await GptMessageService.findByQuery({ HighlightId: id }, false)

        res.status(200).send({ message: 'created', gptMessages: allGptMessages })
    } catch (error) {
        next(error)
    }
}
module.exports = {
    all, create, show, update, destroy, bulkCreate, gptMessages,
}
