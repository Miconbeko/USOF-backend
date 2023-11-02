const ServerError = require(`../../errors/ServerError`)

module.exports = (req, res, next) => {
    if (!req.user.verified)
        return next(new ServerError(`E-mail doesn't verified`, 403))
    next()
}