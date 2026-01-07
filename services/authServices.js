const bcrypt = require("bcrypt");
const { checkEmailExistance } = require("./userServices");

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
    comparePassword,
    sendVerificationEmail,
}