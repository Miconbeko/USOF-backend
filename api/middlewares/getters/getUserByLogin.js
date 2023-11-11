import sequelize from "../../database/db.js";
import ServerError from "../../errors/ServerError.js";
import {transactionErrorHandler} from "../../errors/handlers.js";
import retryError from "../../errors/RetryError.js";

const Op = sequelize.Sequelize.Op
const models = sequelize.models

export default function getUserByLogin(req, res, next) {
    sequelize.inTransaction(async transaction => {
        return await models.User.findOne({
            where: {
                [Op.or]: [
                    {
                        login: req.body.login ?? null
                    },
                    {
                        email: req.body.email ?? null
                    }
                ]
            },
            transaction
        })
    })
        .then(user => {
            if (!user)
                return next(new ServerError(`Invalid login or password`, 401))

            req.user = user
            next()
        })
        .catch(err => {
            transactionErrorHandler(retryError(getUserByLogin, err), req, res, next)
        })
}