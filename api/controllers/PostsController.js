import sequelize from "../database/db.js"
import getPaginationData from "../utils/getPaginationData.js";
import {transactionErrorHandler} from "../errors/handlers.js";
import retryError from "../errors/RetryError.js";
import createToken from "../utils/createToken.js";
import sanitize from "../utils/modelSanitizer.js";
import increments from "../utils/ratingIncrements.js";

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
                    post: sanitize(post)
                })
            })
            .catch(err => {
                transactionErrorHandler(retryError(this.create, err), req, res, next)
            })
    }

    edit = async (req, res, next) => {
        sequelize.inTransaction(async transaction => {
            const [post ] = await Promise.all([
                await req.post.update({
                    title: req.body.title,
                    content: req.body.content
                }, { transaction }),

                await models.PostCategories.destroy({
                    where: {
                        PostId: req.post.id
                    },
                    transaction
                })
            ])

            await post.addCategories(req.categories, { transaction })

            return post
        })
            .then(post => {
                res.status(200).json({
                    message: `Post successfully changed`,
                    post: sanitize(post)
                })
            })
            .catch(err => {
                transactionErrorHandler(retryError(this.edit, err), req, res, next)
            })
    }

    getAll = async (req, res, next) => {
        let include =[{
            model: models.Token,
            as: `lock`
        }, {
            model: models.Category,
            as: `categories`
        }, {
            model: models.User,
            as: `author`
        }]
        let includeMarks = {
            model: models.Mark,
            limit: 1,
            where: {
                userId: req.user?.id,
                markableType: `post`,
            }
        }

        if (req.user)
            include.push(includeMarks)

        sequelize.inTransaction(async transaction => {
            return await models.Post.findAndCountAll({
                include,
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
                    posts: sanitize(data.items)
                })
            })
            .catch(err => {
                transactionErrorHandler(retryError(this.getAll, err), req, res, next)
            })
    }

    getOne = async (req, res, next) => {
        res.status(200).json({
            post: sanitize(req.post)
        })
    }

    getComments = async (req, res, next) => {
        sequelize.inTransaction(async transaction => {
            const [count, rows] = await Promise.all([
                req.post.countComments({ transaction }),

                req.post.getComments({
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
                    comments: sanitize(data.items)
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
                    message: `Comment is created`,
                    comment: sanitize(comment)
                })
            })
            .catch(err => {
                transactionErrorHandler(retryError(this.createComment, err), req, res, next)
            })
    }

    delete = async (req, res, next) => {
        sequelize.inTransaction(async transaction => {
            await req.post.destroy({ transaction })
        })
            .then(() => {
                res.status(200).json({
                    message: `Post is deleted`
                })
            })
            .catch(err => {
                transactionErrorHandler(retryError(this.delete, err), req, res, next)
            })
    }

    lock = async (req, res, next) => {
        sequelize.inTransaction(async transaction => {
            await (await req.post.getLock({ transaction }))?.destroy({ transaction })

            const token = await createToken(`lock`, null, req.user, transaction, req.body.timer)

            await req.post.setLock(token, { transaction })

            return token
        })
            .then(token => {
                res.status(200).json({
                    message: `Post is locked`,
                    post: sanitize(req.post)
                })
            })
            .catch(err => {
                transactionErrorHandler(retryError(this.lock, err), req, res, next)
            })
    }

    unlock = async (req, res, next) => {
        sequelize.inTransaction(async transaction => {
            await (await req.post.getLock({ transaction }))?.destroy({ transaction })
        })
            .then(() => {
                res.status(200).json({
                    message: `Post is unlocked`,
                    post: sanitize(req.post)
                })
            })
            .catch(err => {
                transactionErrorHandler(retryError(this.unlock, err), req, res, next)
            })
    }

    like = async (req, res, next) => {
        let totalIncrement = increments.like

        sequelize.inTransaction(async transaction => {
            if (req?.mark?.type === `dislike`) {
                totalIncrement -= increments.dislike;
                await req.mark.destroy({ transaction })
            }
            await req.post.increment(`rating`, { by: totalIncrement, transaction })
            await req.post.author.increment(`rating`, { by: totalIncrement, transaction })

            const like = await req.post.createMark({ type: `like` }, { transaction })
            await like.setAuthor(req.user, { transaction })

            return like
        })
            .then((like) => {
                res.status(200).json({
                    message: `Like is set`,
                    post: req.post,
                    like
                })
            })
            .catch(err => {
                console.log(err)
                transactionErrorHandler(retryError(this.like, err), req, res, next)
            })
    }

    dislike = async (req, res, next) => {
        let totalIncrement = increments.dislike

        sequelize.inTransaction(async transaction => {
            if (req?.mark?.type === `like`) {
                totalIncrement -= increments.like;
                await req.mark.destroy({ transaction })
            }
            await req.post.increment(`rating`, { by: totalIncrement, transaction })
            await req.post.author.increment(`rating`, { by: totalIncrement, transaction })

            const dislike = await req.post.createMark({ type: `dislike` }, { transaction })
            await dislike.setAuthor(req.user, { transaction })

            return dislike
        })
            .then((dislike) => {
                res.status(200).json({
                    message: `Dislike is set`,
                    dislike
                })
            })
            .catch(err => {
                transactionErrorHandler(retryError(this.dislike, err), req, res, next)
            })
    }

    // deleteMark = async (req, res, next) => {
    //     sequelize.inTransaction(async transaction => {
    //         await req.mark.destroy({ transaction })
    //     })
    //         .then(() => {
    //             res.status(200).json({
    //                 message: `Mark is deleted`
    //             })
    //         })
    //         .catch(err => {
    //             transactionErrorHandler(retryError(this.deleteMark, err), req, res, next)
    //         })
    // }

    deleteLike = async (req, res, next) => {
        sequelize.inTransaction(async transaction => {
            await req.mark.destroy({ transaction })
            await req.post.increment(`rating`, { by: -increments.like, transaction })
        })
                .then(() => {
                    res.status(200).json({
                        message: `Like is deleted`
                    })
                })
                .catch(err => {
                    transactionErrorHandler(retryError(this.deleteLike, err), req, res, next)
                })
    }

    deleteDislike = async (req, res, next) => {
        sequelize.inTransaction(async transaction => {
            await req.mark.destroy({ transaction })
            await req.post.increment(`rating`, { by: -increments.dislike, transaction })
        })
            .then(() => {
                res.status(200).json({
                    message: `Dislike is deleted`
                })
            })
            .catch(err => {
                transactionErrorHandler(retryError(this.deleteDislike, err), req, res, next)
            })
    }
}

export default new PostsController()