const { ServerError } = require(`./ServerError`)

module.exports = (req, res, next) => {
    const error = new ServerError("Route not found", 404)   // TODO try to optimize

    next(error)
}