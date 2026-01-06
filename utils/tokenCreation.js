const jwt = require("jsonwebtoken")


const tokenCreation = (user) => {
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.SECRET_KEY)
    return token
}

module.exports = {
    tokenCreation
}