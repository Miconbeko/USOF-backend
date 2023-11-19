import ServerError from "../../errors/ServerError.js";

export default function checkNotLiked(req, res, next) {
    if (req.mark?.type === `like`)
        return next(new ServerError(`Like is already set`, 403))
    next()
}