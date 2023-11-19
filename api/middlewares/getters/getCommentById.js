import sequelize from "../../database/db.js";
import ServerError from "../../errors/ServerError.js";
import {transactionErrorHandler} from "../../errors/handlers.js";
import retryError from "../../errors/RetryError.js";

const models = sequelize.models

export default function getCommentById(req, res, next) {
    let include =[{
        model: models.User,
        as: `author`
    }]
    let includeMarks = {
        model: models.Mark,
        limit: 1,
        where: {
            userId: req.user?.id,
            markableType: `comment`,
        }
    }

    if (req.user)
        include.push(includeMarks)

    sequelize.inTransaction(async transaction => {
        return await models.Comment.findByPk(req.body.id, {
            include,
            transaction
        })
    })
        .then(comment => {
            if (!comment)
                return next(new ServerError(`Comment not found`, 404))
            // if (!comment.content)
            //     return next(new ServerError(`Comment is deleted`, 404))

            req.mark = null
            if (comment.Marks)
                req.mark = comment.Marks[0]

            req.comment = comment
            req.body.ownerId = comment.userId
            next()
        })
        .catch(err => {
            return transactionErrorHandler(retryError(getCommentById, err), req, res, next)
        })
}