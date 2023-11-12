import sequelize from "../../database/db.js";
import ServerError from "../../errors/ServerError.js";
import {transactionErrorHandler} from "../../errors/handlers.js";
import retryError from "../../errors/RetryError.js";

const models = sequelize.models

export default function getUserByToken(req, res, next) {
    sequelize.inTransaction(async transaction => {
        const token = await models.Token.findByPk(req.token.tokenId, { transaction })
        const user = await token?.getOwner({ transaction })
        return { user, token }
    })
        .then(res => {
            const { user, token } = res
            if (!token || !user)
                return next(new ServerError(`Invalid or expired token`, 401))

            user.token = token
            req.user = user
            next()
        })
        .catch(err => {
            return transactionErrorHandler(retryError(getUserByToken, err), req, res, next)
        })
}