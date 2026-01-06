const mongoose = require("mongoose")
const Joi = require("joi");

const UserSchema = new mongoose.Schema({
    email:
    {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    deleted: {
        type: Boolean,
        default: false,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: [
            "SUPER_ADMIN",
            "USER",
            "TICKETS_MANAGER",
            "SNACKS_MANAGER",
            "EMPLOYEE"
        ],
    },
},

    { timestamps: true }
)

const User = mongoose.model("User", UserSchema)

function validatUserCreation(obj) {
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required().min(8).max(20),
        username: Joi.string().required().min(3),
    });

    return schema.validate(obj);
}

function validatLogin(obj) {
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required().min(8).max(20),
    });

    return schema.validate(obj);
}


module.exports = {
    User,
    validatUserCreation,
    validatLogin
}