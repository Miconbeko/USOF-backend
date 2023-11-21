import ServerError from "../../errors/ServerError.js";

export default function (req, res, next) {
    try {
        req.page = {
            offset: parseInt((req.query.page - 1) * req.query.size),
            limit: parseInt(req.query.size)
        }
        next()
    } catch (err) {
        next(new ServerError(`Pagination calculation error`), 500)
    }
}