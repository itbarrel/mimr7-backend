const Joi = require('joi')

const playerObj = {
    body: Joi.object().keys({
        firstName: Joi.string().required(),
        lastName: Joi.string(),
        organizationName: Joi.string(),
        mobilePhone: Joi.string(),
        country: Joi.string(),
        email: Joi.string(),
        AccountId: Joi.string(),
        UserId: Joi.string(),
        description: Joi.string(),
    }).options({ allowUnknown: true }),
}

module.exports = {
    playerObj,
}
