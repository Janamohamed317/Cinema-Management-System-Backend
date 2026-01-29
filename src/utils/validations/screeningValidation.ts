import Joi from "joi"
import { ScreeningAddingBody } from "../../types/screening";


export function validatScreeningData(obj: ScreeningAddingBody) {
    const schema = Joi.object({
        hallId: Joi.string().uuid().required(),
        movieId: Joi.string().uuid().required(),
        startTime: Joi.date().required()
    })

    return schema.validate(obj)
}

