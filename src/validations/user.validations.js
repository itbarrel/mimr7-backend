const Joi = require('joi');

const userObj = {
  body: Joi.object().keys({
    userName: Joi.string().required(),
    AccountId:Joi.string(),
    password: Joi.string(),
    firstName: Joi.string(),
    email: Joi.string(),
    active: Joi.boolean(),
    status: Joi.boolean(),
    
  }),
};

module.exports = {
    userObj,
};
