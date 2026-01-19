import Joi from "joi";
import { Role } from "../../generated/prisma";
 

export const tokenSchema = Joi.object({
  id: Joi.string().required(),
  role: Joi.string()
    .valid(...Object.values(Role))
    .required(),
}).unknown(true)