const jwt = require(`jsonwebtoken`)
const ServerError = require(`../../errors/ServerError`)


module.exports = async (req, res, next) => {
    try {
        req.token = jwt.verify(req.body.token, process.env.JWT_KEY)
    }
    catch (err) {
        return next(new ServerError(`Invalid or expired token`, 401))
    }
    next()
}