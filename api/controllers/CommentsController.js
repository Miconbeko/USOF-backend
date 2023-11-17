import sequelize from "../database/db.js"
import {transactionErrorHandler} from "../errors/handlers.js";
import retryError from "../errors/RetryError.js";
import sanitize from "../utils/modelSanitizer.js";

const Op = sequelize.Sequelize.Op
const models = sequelize.models

class CommentsController{
    create = async (req, res, next) => {
        sequelize.inTransaction(async transaction => {
            const comment = await models.Comment.create({
                content: req.body.content
            }, { transaction })

            await comment.setAuthor(req.user, { transaction })
            await comment.setPost(req.post, { transaction })
            await comment.setComment(req.comment, { transaction })

            return comment
        })
            .then(comment => {
                res.status(201).json({
                    message: `Comment is created`,
                    comment: sanitize(comment)
                })
            })
            .catch(err => {
                transactionErrorHandler(retryError(this.create, err), req, res, next)
            })
    }

    getOne = async (req, res, next) => {
        res.status(200).json({
            comment: sanitize(req.comment)
        })
    }

    edit = async (req, res, next) => {
        sequelize.inTransaction(async transaction => {
            return await req.comment.update({
                content: req.body.content
            }, { transaction })
        })
            .then(comment => {
                res.status(200).json({
                    message: `Comment is edited`,
                    comment: sanitize(comment)
                })
            })
            .catch(err => {
                transactionErrorHandler(retryError(this.edit, err), req, res, next)
            })
    }

    delete = async (req, res, next) => {
        sequelize.inTransaction(async transaction => {
            await req.comment.destroy({ transaction })
        })
            .then(() => {
                res.status(200).json({
                    message: `Comment is deleted`
                })
            })
            .catch(err => {
                transactionErrorHandler(retryError(this.delete, err), req, res, next)
            })
    }
}

export default new CommentsController()