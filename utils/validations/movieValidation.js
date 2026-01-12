const Joi = require("joi");

function validateAddingMovie(obj) {
    const schema = Joi.object({
        name: Joi.string().required(),
        duration: Joi.number().required()
    });

    return schema.validate(obj);
}


function validateMovieId(id) {
    return Joi.string()
        .uuid()
        .required()
        .validate(id);
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