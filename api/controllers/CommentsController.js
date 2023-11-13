import sequelize from "../database/db.js"
import {transactionErrorHandler} from "../errors/handlers.js";
import retryError from "../errors/RetryError.js";

const Op = sequelize.Sequelize.Op
const models = sequelize.models

class CommentsController{
    getOne = async (req, res, next) => {
        res.status(200).json({
            comment: req.comment
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
                    message: `Comment successfully edited`,
                    comment
                })
            })
            .catch(err => {
                transactionErrorHandler(retryError(this.edit, err), req, res, next)
            })
    }
}

export default new CommentsController()