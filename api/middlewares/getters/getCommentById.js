import sequelize from "../../database/db.js";
import ServerError from "../../errors/ServerError.js";
import {transactionErrorHandler} from "../../errors/handlers.js";
import retryError from "../../errors/RetryError.js";

const models = sequelize.models

export default function getCommentById(req, res, next) {
    sequelize.inTransaction(async transaction => {
        return await models.Comment.findByPk(req.body.id, { transaction })
    })
        .then(comment => {
            if (!comment)
                return next(new ServerError(`Comment not found`, 404))

            req.comment = comment
            req.body.ownerId = comment.userId
            next()
        })
        .catch(err => {
            return transactionErrorHandler(retryError(getCommentById, err), req, res, next)
        })
}