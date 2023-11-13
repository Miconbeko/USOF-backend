import sequelize from "../../database/db.js";
import ServerError from "../../errors/ServerError.js";
import {transactionErrorHandler} from "../../errors/handlers.js";
import retryError from "../../errors/RetryError.js";

const models = sequelize.models

export default function getPostById(req, res, next) {
    sequelize.inTransaction(async transaction => {
        return await models.Post.findByPk(req.body.id, { transaction })
    })
        .then(post => {
            if (!post)
                return next(new ServerError(`Post not found`, 404))

            req.post = post
            req.body.ownerId = post.userId
            next()
        })
        .catch(err => {
            return transactionErrorHandler(retryError(getPostById, err), req, res, next)
        })
}