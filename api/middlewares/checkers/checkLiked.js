import ServerError from "../../errors/ServerError.js";

export default function checkNotLiked(req, res, next) {
    if (req.mark?.type !== `like`)
        return next(new ServerError(`Like isn't set`, 403))
    next()
}