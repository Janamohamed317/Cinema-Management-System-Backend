import Joi from "joi";

export function validateUserCreation(obj:any) {
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required().min(8).max(20),
        username: Joi.string().required().min(3),
    });

    return schema.validate(obj);
}

export function validateLogin(obj: any) {
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required().min(8).max(20),
    });

    return schema.validate(obj);
}

