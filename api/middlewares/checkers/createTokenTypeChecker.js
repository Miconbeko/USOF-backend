const jwt = require(`jsonwebtoken`)
const ServerError = require(`../../errors/ServerError`)

module.exports = (type) => {
    return (req, res, next) => {
        if (req.user.token.type !== type)
            return next(new ServerError(`Invalid or expired token`, 401))
        next()
    }
}