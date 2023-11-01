const ServerError = require(`../../errors/ServerError`)

module.exports = (req, res, next) => {
    if (req.user.verified)
        next(new ServerError(`E-mail is already verified`, 403))
    next()
}