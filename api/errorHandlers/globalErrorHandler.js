module.exports = (error, req, res, next) => {
    res.status(error.code || 500)
    res.json({
        message: error.message,
        errors: error.errors,
        method: req.method,
        url: req.url,
        // body: req.body
    })
}