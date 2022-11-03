const Joi = require('joi')

const highlightObj = {
    body: Joi.object().keys({
        content: Joi.string().required(),
        AccountId: Joi.string(),
        ContentId: Joi.string(),
        description: Joi.string(),
    }).options({ allowUnknown: true }),
}

module.exports = {
    highlightObj,
}
