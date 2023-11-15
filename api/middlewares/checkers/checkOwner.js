import ServerError from "../../errors/ServerError.js";

export default function checkOwner(req, res, next) {
    if (req.user.id !== req.body.ownerId && req.user.role !== `admin`)
        return next(new ServerError(`You are not an owner`, 403))
    return next()
}