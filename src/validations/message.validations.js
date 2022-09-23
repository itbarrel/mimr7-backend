const Joi = require('joi')

const messageObj = {
    body: Joi.object().keys({
        name: Joi.string(),
        hint: Joi.string(),
        solution: Joi.string(),
        AccountId: Joi.string(),
        CollectionId: Joi.string(),
        HighlightId: Joi.string(),
        number: Joi.string(),
        offset: Joi.string(),
        type: Joi.string(),

    }).options({ allowUnknown: true }),
}

module.exports = {
    messageObj,
}

