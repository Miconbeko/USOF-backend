module.exports = (err, req, res, next) => {
    res.status(err.code || 500)
    res.json({
        message: err.message,
        errors: err.errors,
        method: req.method,
        url: req.url,
        // body: req.body
    })
}