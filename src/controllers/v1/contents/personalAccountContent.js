const PDFParser = require('pdf-parse')
const fs = require('fs')
const { Configuration, OpenAIApi } = require('openai')
const config = require('../../../../config')

const configuration = new Configuration({
    apiKey: config.OPEN_AI_KEY,
})

const openai = new OpenAIApi(configuration)
const uploadFile = require('../../../middlewares/uploadFIle')

const personalAcountContent = async (req, res) => {
    try {
        await uploadFile(req, res)

        if (req.file === undefined) {
            return res.status(400).send({ message: 'Please upload a file!' })
        }
        const { file } = req
        const pdfBuffer = fs.readFileSync(file.path)

        // Parse the PDF buffer
        const data = await PDFParser(pdfBuffer)

        // Extracted text
        const { text } = data
        // const prompt = `make the hightlights of the given content ${text} without numbering the highlights ###`

        // const response = await openai.createCompletion({
        //     model: 'text-davinci-003',
        //     prompt: ` ${prompt}`,
        //     max_tokens: 100,
        //     temperature: 0,
        //     top_p: 1.0,
        //     frequency_penalty: 0.0,
        //     presence_penalty: 0.0,
        // })
        // const hightlights = response.data.choices[0].text.trim().split('\n')
        // let group = await GptHighlightService.max('group')
        // // eslint-disable-next-line no-unused-expressions
        // Number.isNaN(group) ? group = 1 : group += 1
        // Promise.all(hightlights.map(async (highlight) => {
        //     const gptObj = {
        //         group,
        //         content: highlight,
        //         AccountId,
        //         ContentId: id,
        //     }
        //     await GptHighlightService.create(gptObj)
        // }))
        // const allGptHighlights = await GptHighlightService.findByQuery({ ContentId: id }, false)

        // res.status(200).send({ message: 'created', gptHighlights: allGptHighlights })
        res.send({ message: 'file Uploaded', file, text })
    } catch (error) {
        res.status(400).send(error.message)
    }
}
module.exports = personalAcountContent
