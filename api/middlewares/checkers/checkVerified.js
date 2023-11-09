import ServerError from "../../errors/ServerError.js";

export default (req, res, next) => {
    if (!req.user.verified)
        return next(new ServerError(`E-mail doesn't verified`, 403))
    next()
}