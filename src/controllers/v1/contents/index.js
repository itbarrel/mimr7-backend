const { Configuration, OpenAIApi } = require('openai')
const { Op } = require('sequelize')
const config = require('../../../../config')

const configuration = new Configuration({
    apiKey: config.OPEN_AI_KEY,
})

const openai = new OpenAIApi(configuration)

const {
    ContentService,
    KlassService,
    GptHighlightService,
} = require('../../../services/resources')

const all = async (req, res) => {
    try {
        const {
            offset, limit, sort, ...query
        } = req.query

        const { docs, pages, total } = await ContentService.all(
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

const create = async (req, res) => {
    try {
        const { description, AccountId } = req.body
        const newContent = await ContentService.create(req.body)
        const prompt = `make the hightlights of the given content ${description} without numbering the highlights ###`

        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: ` ${prompt}`,
            max_tokens: 100,
            temperature: 0,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        })
        const hightlights = response.data.choices[0].text.trim().split('\n')
        let group = await GptHighlightService.max('group')
        // eslint-disable-next-line no-unused-expressions
        Number.isNaN(group) ? (group = 1) : (group += 1)
        Promise.all(
            hightlights.map(async (highlight) => {
                const gptObj = {
                    group,
                    content: highlight,
                    AccountId,
                    ContentId: newContent.id,
                }
                await GptHighlightService.create(gptObj)
            }),
        )
        return res.status(201).json({
            success: true,
            data: newContent,
        })
    } catch (error) {
        res.status(400).send(error)
    }
}

const show = async (req, res) => {
    try {
        const { id } = req.params
        const content = await ContentService.findByQuery({ id }, true, 'all', [
            'GptHighlights',
        ])
        content
            ? res.status(200).send({ content })
            : res.status(400).send({ message: 'content not found' })
    } catch (error) {
        res.status(400).send(error)
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params
        const content = await ContentService.update(req.body, { id })
        content
            ? res.status(200).send({ content })
            : res.status(400).send({ message: 'content is not updated' })
    } catch (error) {
        res.status(400).send(error)
    }
}

const destroy = async (req, res) => {
    try {
        const { id } = req.params
        await ContentService.delete({ id })
        res.status(200).send({ message: 'Content is deleted' })
    } catch (error) {
        res.status(400).send(error)
    }
}
const getAllContent = async (req, res) => {
    try {
        const { id } = req.params
        const klass = await KlassService.findById(id)

        const contents = await klass.getContents()
        const Ids = contents.map((content) => content.id)
        const { docs: Contents } = await ContentService.all({
            id: { [Op.notIn]: Ids },
        })

        res.status(200).send(Contents)
    } catch (error) {
        res.status(400).send(error)
    }
}
const gptHighlights = async (req, res) => {
    try {
        const { id } = req.params
        const { description, AccountId } = await ContentService.findById(id)
        const prompt = `make the hightlights of the given content ${description} without numbering the highlights ###`

        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: ` ${prompt}`,
            max_tokens: 100,
            temperature: 0,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        })
        const hightlights = response.data.choices[0].text.trim().split('\n')
        let group = await GptHighlightService.max('group')
        // eslint-disable-next-line no-unused-expressions
        Number.isNaN(group) ? (group = 1) : (group += 1)
        Promise.all(
            hightlights.map(async (highlight) => {
                const gptObj = {
                    group,
                    content: highlight,
                    AccountId,
                    ContentId: id,
                }
                await GptHighlightService.create(gptObj)
            }),
        )
        const allGptHighlights = await GptHighlightService.findByQuery(
            { ContentId: id },
            false,
        )

        res
            .status(200)
            .send({ message: 'created', gptHighlights: allGptHighlights })
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
    getAllContent,
    gptHighlights,
}
