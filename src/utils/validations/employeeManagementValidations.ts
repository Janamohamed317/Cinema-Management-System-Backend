import Joi from "joi";

import { Role } from "../../generated/prisma"

export function validateAssignedEmployee(obj: any) {
    const schema = Joi.object({
        userId: Joi.string().required(),
        role: Joi.string().valid(...Object.values(Role)).required()
    });

    return schema.validate(obj);
}

