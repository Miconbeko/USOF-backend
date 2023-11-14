import sequelize from "../../database/db.js";
import ServerError from "../../errors/ServerError.js";
import {transactionErrorHandler} from "../../errors/handlers.js";
import retryError from "../../errors/RetryError.js";

const models = sequelize.models

export default function getCommentById(req, res, next) {
    sequelize.inTransaction(async transaction => {
        return await models.Category.findByPk(req.body.id, { transaction })
    })
        .then(category => {
            if (!category)
                return next(new ServerError(`Category not found`, 404))

            req.category = category
            next()
        })
        .catch(err => {
            return transactionErrorHandler(retryError(getCommentById, err), req, res, next)
        })
}