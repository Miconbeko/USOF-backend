const ServerError = require(`../../errors/ServerError`)

module.exports = (req, res, next) => {
    if (req.user.token !== req.body.token)
        next(new ServerError(`Invalid or expired token`, 401))
    next()
}