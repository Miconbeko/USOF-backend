import ServerError from "../../errors/ServerError.js";

export default (req, res, next) => {
    if (req.user.role === `user`)
        return next(new ServerError(`You need to be an admin`, 403))
    next()
}