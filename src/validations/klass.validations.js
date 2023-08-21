const Joi = require('joi')

const klassObj = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        AccountId: Joi.string(),
        OrganizationId: Joi.string(),
        description: Joi.string(),

    }).options({ allowUnknown: true }),
}

module.exports = {
    klassObj,
}
