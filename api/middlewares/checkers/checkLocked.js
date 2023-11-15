import ServerError from "../../errors/ServerError.js";

export default (req, res, next) => {
    if (!req.post.lockId)
        return next(new ServerError(`Post needs to be locked`, 403))
    next()
}