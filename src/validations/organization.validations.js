const Joi = require('joi')

const organizationObj = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        AccountId: Joi.string(),
        city: Joi.string(),
        region: Joi.string(),
        state: Joi.string(),
        active: Joi.boolean(),
        status: Joi.boolean(),

    }).options({ allowUnknown: true }),
}

module.exports = {
    organizationObj,
}
