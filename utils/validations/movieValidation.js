const Joi = require("joi");

function validateAddingMovie(obj) {
    const schema = Joi.object({
        name: Joi.string().required(),
        duration: Joi.number().required()
    });

    return schema.validate(obj);
}


function validateMovieId(obj) {
    const schema = Joi.object({
        id: Joi.string().required(),
    });

    return schema.validate(obj);
}

function validateEditingMovie(obj) {
    const schema = Joi.object({
        name: Joi.string().required(),
        duration: Joi.number().required().min(30)
    });

    return schema.validate(obj);
}

module.exports = {
    validateAddingMovie,
    validateMovieId,
    validateEditingMovie
}