import Joi from "joi";
import { TicketAddingBody } from "../../types/ticket";

export function validateTicketReservation(obj: TicketAddingBody) {
    const schema = Joi.object({
        screeningId: Joi.string().uuid().required(),
        seatIDs: Joi.array().items(Joi.string().uuid()).min(1).required(),
        userId: Joi.string().uuid().required()
    });

    return schema.validate(obj);
}

export function validateTicketId(id: string) {
    return Joi.string()
        .uuid()
        .required()
        .validate(id);
}

export function validateScreeningId(id: string) {
    return Joi.string()
        .uuid()
        .required()
        .validate(id);
}
