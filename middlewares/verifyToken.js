const jwt = require("jsonwebtoken")


function verifyToken(req, res, next) {
    const token = req.headers.token
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    try {
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decodedToken
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid Token" })
    }
}

module.exports = {
    verifyToken,
}