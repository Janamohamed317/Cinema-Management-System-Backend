import Joi from "joi"
import { SeatAddingBody, SeatEditingBody } from "../../types/seat";


export function validateAddingSeat(obj: SeatAddingBody) {
    const schema = Joi.object({
        hallId: Joi.string().uuid().required(),
        seatNumber: Joi.number().required(),
    })

    return schema.validate(obj)
}


export function validateEditingSeat(obj: SeatEditingBody) {
    const schema = Joi.object({
        hallId: Joi.string().uuid(),
        status: Joi.string()
    })

    return schema.validate(obj)
}

export function validateSeatId(id: string) {
    return Joi.string()
        .uuid()
        .required()
        .validate(id);
}