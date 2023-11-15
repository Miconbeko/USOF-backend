import sequelize from "../database/db.js"
import getPaginationData from "../utils/getPaginationData.js";
import {transactionErrorHandler} from "../errors/handlers.js";
import retryError from "../errors/RetryError.js";

const Op = sequelize.Sequelize.Op
const models = sequelize.models

class PostsController {
    create = async (req, res, next) => {
        sequelize.inTransaction(async transaction => {
            const post = await models.Post.create({
                title: req.body.title,
                content: req.body.content
            }, { transaction })

            await post.setAuthor(req.user, { transaction })

            await post.addCategories(req.categories, { transaction })

            return post
        })
            .then(post => {
                res.status(201).json({
                    message: `Post successfully created`,
                    post
                })
            })
            .catch(err => {
                transactionErrorHandler(retryError(this.create, err), req, res, next)
            })
    }

    getAll = async (req, res, next) => {
        sequelize.inTransaction(async transaction => {
            return await models.Post.findAndCountAll({
                order: [[`title`, `DESC`]],
                offset: req.page.offset,
                limit: req.page.limit,
                transaction
            })
        })
            .then(result => {
                const data = getPaginationData(result, req.query.page, req.query.size)

                res.status(200).json({
                    pagination: data.metadata,
                    posts: data.items
                })
            })
            .catch(err => {
                transactionErrorHandler(retryError(this.getAll, err), req, res, next)
            })
    }

    getOne = async (req, res, next) => {
        res.status(200).json({
            post: req.post
        })
    }

    getComments = async (req, res, next) => {
        sequelize.inTransaction(async transaction => {
            const [count, rows] = await Promise.all([
                req.post.countComments({ transaction }),

                req.post.getComments({
                    include: `author`,
                    offset: req.page.offset,
                    limit: req.page.limit,
                    transaction
                })
            ])

            return { count, rows }
        })
            .then(result => {
                const data = getPaginationData(result, req.query.page, req.query.size)

                res.status(200).json({
                    pagination: data.metadata,
                    comments: data.items
                })
            })
            .catch(err => {
                transactionErrorHandler(retryError(this.getComments, err), req, res, next)
            })
    }

    createComment = async (req, res, next) => {
        sequelize.inTransaction(async transaction => {
            const comment = await models.Comment.create({
                content: req.body.content
            }, { transaction })

            await comment.setAuthor(req.user, { transaction })
            await comment.setPost(req.post, { transaction })

            return comment
        })
            .then(comment => {
                res.status(201).json({
                    message: `Comment successfully created`,
                    comment
                })
            })
            .catch(err => {
                transactionErrorHandler(retryError(this.createComment, err), req, res, next)
            })
    }
}

export default new PostsController()