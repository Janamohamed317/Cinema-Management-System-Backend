const Joi = require("joi");


function validateUserCreation(obj) {
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required().min(8).max(20),
        username: Joi.string().required().min(3),
        role: Joi.string().valid("USER")
    });

    return schema.validate(obj);
}

function validateLogin(obj) {
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required().min(8).max(20),
    });

    return schema.validate(obj);
}

module.exports = {
    validateLogin,
    validateUserCreation,
}