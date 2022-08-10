const Joi = require('joi')

const accountObj = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string(),
        active: Joi.boolean(),
        status: Joi.boolean(),
        apikey: Joi.string(),
        organizationName: Joi.string(),
        avatar: Joi.string(),
        type: Joi.string(),
        category_header: Joi.string(),
        messages_font_size: Joi.string(),
        messages_font_family: Joi.string(),
        organization: Joi.object(),
        admin: Joi.object(),

    }),
}

module.exports = {
    accountObj,
}
