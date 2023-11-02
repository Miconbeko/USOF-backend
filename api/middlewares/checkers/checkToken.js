const jwt = require(`jsonwebtoken`)
const ServerError = require(`../../errors/ServerError`)

module.exports = (req, res, next) => {
    try {
        jwt.verify(req.token, process.env.JWT_KEY, { jwtid: req.user.sessionId })
    } catch (err) {
        next(new ServerError(`Invalid or expired token`, 401))
    }
    next()
}