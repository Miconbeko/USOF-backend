import sequelize from "../../database/db.js";
import ServerError from "../../errors/ServerError.js";
import {transactionErrorHandler} from "../../errors/handlers.js";
import retryError from "../../errors/RetryError.js";

const maxLoginDevices = 5

export default function checkMaxLoginDevices(req, res, next) {
    sequelize.inTransaction(async transaction => {
        return req.user.countTokens({
            where: {
                type: `session`
            },
            transaction
        })
    })
        .then((count) => {
            console.log(count)
            if (count >= maxLoginDevices)
                return next(new ServerError(`Too many logged devices. Max: ${maxLoginDevices}`), 403)
            return next()
        })
        .catch(err => {
            return transactionErrorHandler(retryError(checkMaxLoginDevices, err), req, res, next)
        })
}