const Joi = require('joi')

const contentObj = {
    body: Joi.object().keys({
        title: Joi.string().required(),
        AccountId: Joi.string(),
        UserId: Joi.string(),
        text: Joi.string(),
        description: Joi.string(),
        private: Joi.boolean(),
        saleable: Joi.boolean(),
        type: Joi.string(),
        kind: Joi.string(),
        active: Joi.boolean(),

    }).options({ allowUnknown: true }),
}

module.exports = {
    contentObj,
}
