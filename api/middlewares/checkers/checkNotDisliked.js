import ServerError from "../../errors/ServerError.js";

export default function checkNotDisliked(req, res, next) {
    if (req.mark?.type === `dislike`)
        return next(new ServerError(`Dislike is already set`, 403))
    next()
}