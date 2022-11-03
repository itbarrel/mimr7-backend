const Joi = require('joi')

const contentLibraryObj = {
    body: Joi.object().keys({
        title: Joi.string().required(),
        AccountId: Joi.string(),
        parentId: Joi.string(),
        link: Joi.string(),
        description: Joi.string(),
        filename: Joi.string(),
        url: Joi.string(),
        type: Joi.string(),
        mimetype: Joi.string(),
        tags: Joi.string(),
        active: Joi.boolean(),

    }).options({ allowUnknown: true }),
}

module.exports = {
    contentLibraryObj,
}
