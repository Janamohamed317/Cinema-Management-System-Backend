import Joi from "joi"
import { HallAddingBody, HallEditinggBody } from "../../types/hall"
import { HallType, ScreenType } from "../../generated/prisma";

export function validateHallData(obj: HallAddingBody) {
    const schema = Joi.object({
        name: Joi.string().min(2).required(),
        type: Joi.string()
            .valid(...Object.values(HallType))
            .required(),
        screenType: Joi.string()
            .valid(...Object.values(ScreenType))
            .required(),
        seats: Joi.number().min(50).required(),
    })

    return schema.validate(obj)
}


export function validateHallId(id: string) {
    return Joi.string()
        .uuid()
        .required()
        .validate(id);
}

export function validateHallUpdate(obj: HallEditinggBody) {
    const schema = Joi.object({
        name: Joi.string().min(2),
        type: Joi.string().valid(...Object.values(HallType)),
        screenType: Joi.string().valid(...Object.values(ScreenType)),
        seats: Joi.number().min(50),
    }).min(1)

    return schema.validate(obj)
}

