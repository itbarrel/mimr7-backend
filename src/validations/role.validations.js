const Joi = require('joi')

const roleObj = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        value: Joi.string(),
        AccountId: Joi.string(),

    }).options({ allowUnknown: true }),
}

module.exports = {
    roleObj,
}
