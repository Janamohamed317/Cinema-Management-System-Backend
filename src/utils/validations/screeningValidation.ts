import Joi from "joi"
import { ScreeningAddingBody, ScreeningEditingBody } from "../../types/screening";


export function validateScreeningData(obj: ScreeningAddingBody) {
    const schema = Joi.object({
        hallId: Joi.string().uuid().required(),
        movieId: Joi.string().uuid().required(),
        startTime: Joi.date().required()
    })

    return schema.validate(obj)
}


export function validateEditScreeningData(obj: ScreeningEditingBody) {
    const schema = Joi.object({
        hallId: Joi.string().uuid(),
        movieId: Joi.string().uuid(),
        startTime: Joi.date()
    })

    return schema.validate(obj)
}

export function validatScreeningId(id: string) {
    return Joi.string()
        .uuid()
        .required()
        .validate(id);
}

