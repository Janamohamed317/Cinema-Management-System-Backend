import Joi from "joi"
import { MovieAddingBody, MovieEditingBody } from "../../types/movie";

export function validateAddingMovie(obj: MovieAddingBody) {
    const schema = Joi.object({
        name: Joi.string().required(),
        duration: Joi.number().required()
    });

    return schema.validate(obj);
}


export function validateMovieId(id: string) {
    return Joi.string()
        .uuid()
        .required()
        .validate(id);
}

export function validateEditingMovie(obj: MovieEditingBody) {
    const schema = Joi.object({
        name: Joi.string().required().optional(),
        duration: Joi.number().required().min(30).optional()
    });

    return schema.validate(obj);
}

