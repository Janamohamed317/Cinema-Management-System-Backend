const Joi = require("joi");

function validateAssignedEmployee(obj) {
    const schema = Joi.object({
        userId: Joi.number().required(),
        role: Joi.string().valid(
            "SUPER_ADMIN",
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