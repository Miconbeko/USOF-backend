import sequelize from "../../database/db.js";
import ServerError from "../../errors/ServerError.js";
import {transactionErrorHandler} from "../../errors/handlers.js";
import retryError from "../../errors/RetryError.js";

const Op = sequelize.Sequelize.Op
const models = sequelize.models

export default function getPostByComment(req, res, next) {
    sequelize.inTransaction(async transaction => {
        return await req.comment.getPost({
            include: [{
                model: models.Token,
                as: `lock`
            }, {
                model: models.Category,
                as: `categories`
            }],
            transaction
        })
    })
        .then(post => {
            if (!post)
                return next(new ServerError(`Post not found`, 404))

            req.post = post
            req.body.ownerId = post.userId
            next()
        })
        .catch(err => {
            return transactionErrorHandler(retryError(getPostByComment, err), req, res, next)
        })
}