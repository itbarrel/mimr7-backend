const Joi = require('joi')

const deviceObj = {
    body: Joi.object().keys({
        device_token: Joi.string(),
        application_arn: Joi.string(),
        AccountId: Joi.string(),
        UserId: Joi.string(),
    }),
}

module.exports = {
    deviceObj,
}
