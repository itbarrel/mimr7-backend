const Joi = require('joi')

const locationObj = {
    body: Joi.object().keys({
        address1: Joi.string(),
        address2: Joi.string(),
        address3: Joi.string(),
        AccountId: Joi.string(),
        city: Joi.string(),
        country: Joi.string(),
        state: Joi.string(),
        mobilePhone: Joi.string(),
        officePhone: Joi.string(),
        type: Joi.string(),
        location: Joi.string(),
        active: Joi.boolean(),
        status: Joi.boolean(),

    }).options({ allowUnknown: true }),
}

module.exports = {
    locationObj,
}
