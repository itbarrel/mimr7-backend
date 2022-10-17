const Joi = require('joi')

const dynamicFormObj = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        AccountId: Joi.string(),
        fields: Joi.object(),
        heading: Joi.string(),
        page_link: Joi.string(),
    }).options({ allowUnknown: true }),
}

module.exports = {
    dynamicFormObj,
}
