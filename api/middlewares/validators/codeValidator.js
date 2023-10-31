const ServerError = require(`../../errors/ServerError`)

module.exports = (req, res, next) => {
    if (req.user.verificationCode !== req.body.code)
        next(new ServerError(`Wrong validation code`, 406))
    next()
}