import ServerError from "../../errors/ServerError.js";

export default (type) => {
    return (req, res, next) => {
        if (req.user.token.type !== type)
            return next(new ServerError(`Invalid or expired token`, 401))
        next()
    }
}