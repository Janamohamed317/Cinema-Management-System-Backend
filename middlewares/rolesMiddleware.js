function requireAdmin(req, res, next) {
    if (req.user.role == "SUPER_ADMIN") {
        return next()
    }
    else {
        return res.status(403).json({ message: "Not Authorized" })
    }
}

function requireMovieManagementAccess(req, res, next) {
    if (req.user.role == "MOVIES_MANAGER" || req.user.role == "SUPER_ADMIN") {
        return next()
    }
    else {
        return res.status(403).json({ message: "Not Authorized" })
    }
}

module.exports = {
    requireAdmin,
    requireMovieManagementAccess
}