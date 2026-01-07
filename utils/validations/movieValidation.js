const Joi = require("joi");

function validateAddingMovie(obj) {
    const schema = Joi.object({
        movieName: Joi.string().required(),
        movieDuration: Joi.number().required()
    });

    return schema.validate(obj);
}

module.exports = {
    validateAddingMovie
}