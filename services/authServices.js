const { User } = require("../models/UserModel")
const bcrypt = require("bcrypt")


const checkUserExistance = async (email, username) => {
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

const comparePassword = async (email, password) => {
    const user = await checkEmailExistance(email)
    if (!user) return false;

    const isMatched = await bcrypt.compare(password, user.password);
    return isMatched
}


const sendVerificationEmail = () => {
    // to do
}

module.exports = {
    checkUserExistance,
    comparePassword,
    sendVerificationEmail,
    checkEmailExistance,
}