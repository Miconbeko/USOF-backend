module.exports = (req, res, next) => {
    const error = new Error("Route not found")

    error.code = 404
    next(error)
}