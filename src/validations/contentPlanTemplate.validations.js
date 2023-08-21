const Joi = require('joi')

const contentPlanTemplateObj = {
    body: Joi.object().keys({
        AccountId: Joi.string(),
        CollectionId: Joi.string(),
        KlassId: Joi.string(),
        DynamicFormID: Joi.string(),
        status: Joi.string(),
        schedule_type: Joi.string(),
        content_activated: Joi.boolean(),
        scheduled_date: Joi.date(),
        start_time: Joi.date(),
        pause_date: Joi.date(),
        resume_date: Joi.date(),
        play_date: Joi.date(),

    }).options({ allowUnknown: true }),
}

module.exports = {
    contentPlanTemplateObj,
}
