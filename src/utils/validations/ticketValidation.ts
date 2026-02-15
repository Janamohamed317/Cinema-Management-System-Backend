import Joi from "joi";

export function validateTicketReservation(obj: any) {
    const schema = Joi.object({
        screeningId: Joi.string().uuid().required(),
        seatIDs: Joi.array().items(Joi.string().uuid()).min(1).required(),
        userId: Joi.string().uuid().required()
    });

    return schema.validate(obj);
}

export function validateTicketId(obj: any) {
    const schema = Joi.object({
        id: Joi.string().uuid().required()
    });

    return schema.validate(obj);
}

export function validateScreeningId(obj: any) {
    const schema = Joi.object({
        screeningId: Joi.string().uuid().required()
    });

    return schema.validate(obj);
}
