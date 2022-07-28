const Joi = require('joi')

const roleObj = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        value: Joi.string(),

    }),
}

module.exports = {
    roleObj,
}
