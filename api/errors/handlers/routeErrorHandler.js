const ServerError = require(`../ServerError`)

module.exports = (req, res, next) => {
    next(new ServerError("Route not found", 404))
}