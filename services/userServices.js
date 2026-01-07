const { User } = require("../models/UserModel");

const findUserByEmailOrUsername = async (email, username) => {
    const user = await User.findOne({ $or: [{ email: email }, { username: username }] });
    if (user) {
        return user
    }
    return null
}

const checkEmailExistance = async (email) => {
    const user = await User.findOne({ email: email });
    if (user) {
        return user
    }
    return null
}

module.exports = {
    findUserByEmailOrUsername,
    checkEmailExistance,
}