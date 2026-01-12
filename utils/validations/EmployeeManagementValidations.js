const Joi = require("joi");

function validateAssignedEmployee(obj) {
    const schema = Joi.object({
        userId: Joi.string().required(),
        role: Joi.string().valid(
            "SUPER_ADMIN",
            "HALL_MANAGER",
            "MOVIES_MANAGER",
            "USER",
            "TICKETS_MANAGER",
            "SNACKS_MANAGER",
            "UNASSIGNED").required()
    });

    return schema.validate(obj);
}

module.exports = {
    validateAssignedEmployee
}