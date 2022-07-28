const Joi = require('joi')

const userObj = {
    body: Joi.object().keys({
        userName: Joi.string().required(),
        AccountId: Joi.string(),
        RoleId: Joi.string(),
        password: Joi.string().required(),
        firstName: Joi.string(),
        email: Joi.string(),
        active: Joi.boolean(),
        status: Joi.boolean(),

    }),
}

module.exports = {
    userObj,
}
