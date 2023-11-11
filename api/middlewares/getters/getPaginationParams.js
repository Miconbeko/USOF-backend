export default function (req, res, next) {
    req.page = {
        offset: parseInt((req.query.page - 1) * req.query.size),
        limit: parseInt(req.query.size)
    }
    next()
}