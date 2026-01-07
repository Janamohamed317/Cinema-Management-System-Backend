const mongoose = require("mongoose")

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
            "UNASSIGNED"
        ],
    },
},

    { timestamps: true }
)

const User = mongoose.model("User", UserSchema)

module.exports = {
    User,
}