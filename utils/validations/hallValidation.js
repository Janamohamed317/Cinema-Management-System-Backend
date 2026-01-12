const Joi = require("joi")


function validateHallData(obj) {
    const schema = Joi.object({
        name: Joi.string().required().min(2),
        type: Joi.string().valid(
            "REGULAR",
            "VIP",
        ).required(),
        screenType: Joi.string().valid(
            "TWO_D",
            "THREE_D",
            "IMAX",
            "SCREEN_X",
        ).required(),
        seats: Joi.number().min(50).required()
    })
    return schema.validate(obj);
}

function validateHallId(id) {
    return Joi.string()
        .uuid()
        .required()
        .validate(id);
}

const validateHallUpdate = (obj) => {
    const schema = Joi.object({
        name: Joi.string().min(2),
        type: Joi.string().valid("REGULAR", "VIP"),
        screenType: Joi.string().valid("TWO_D", "THREE_D", "IMAX", "SCREEN_X"),
        seats: Joi.number().min(50),
    }).min(1);

    return schema.validate(obj);
};


module.exports = {
    validateHallData,
    validateHallId,
    validateHallUpdate
}