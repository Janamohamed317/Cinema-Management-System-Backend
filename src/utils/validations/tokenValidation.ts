import Joi from "joi";
import { Role } from "@prisma/client";
 

export const tokenSchema = Joi.object({
  id: Joi.string().required(),
  role: Joi.string()
    .valid(...Object.values(Role))
    .required(),
}).unknown(true)