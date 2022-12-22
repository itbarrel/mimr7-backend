const Joi = require('joi')

const studentObj = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        AccountId: Joi.string(),
        OrganizationId: Joi.string(),
        email: Joi.string(),
        mobilePhone: Joi.string(),

    }).options({ allowUnknown: true }),
}

module.exports = {
    studentObj,
}
