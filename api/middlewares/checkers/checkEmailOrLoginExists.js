import sequelize from "../../database/db.js";
import ServerError from "../../errors/ServerError.js";
import {transactionErrorHandler} from "../../errors/handlers.js";
import retryError from "../../errors/RetryError.js";

const Op = sequelize.Sequelize.Op
const models = sequelize.models

export default function checkEmailOrLoginExists(req, res, next) {
    sequelize.inTransaction(async transaction => {
        return await models.User.findOne({
            where: {
                [Op.or]: [
                    {
                        login: req.body.login
                    },
                    {
                        email: req.body.email
                    }
                ]
            },
            transaction
        })
    })
        .then(user => {
            if (user?.email === req.body.email)
                return next(new ServerError(`E-mail already in use`, 409))

            if (user?.login === req.body.login)
                return next(new ServerError(`Login already in use`, 409))

            next()
        })
        .catch(err => {
            return transactionErrorHandler(retryError(checkEmailOrLoginExists, err), req, res, next)
        })
}