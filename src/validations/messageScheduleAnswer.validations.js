const Joi = require('joi')

const messageScheduleAnswerObj = {
    body: Joi.object().keys({
        response: Joi.string(),
        AccountId: Joi.string().required(),
        StudentId: Joi.string().required(),
        MessageScheduleId: Joi.string().required(),

    }).options({ allowUnknown: true }),
}

module.exports = {
    messageScheduleAnswerObj,
}
