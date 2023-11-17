import sequelize from "../database/db.js"
import getPaginationData from "../utils/getPaginationData.js";
import {transactionErrorHandler} from "../errors/handlers.js";
import retryError from "../errors/RetryError.js";
import sanitize from "../utils/modelSanitizer.js";

const Op = sequelize.Sequelize.Op
const models = sequelize.models

class CategoriesController{
    getAll = async (req, res, next) => {
        sequelize.inTransaction(async transaction => {
            return await models.Category.findAndCountAll({
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
                    categories: data.items
                })
            })
            .catch(err => {
                transactionErrorHandler(retryError(this.getAll, err), req, res, next)
            })
    }

    getOne = async (req, res, next) => {
        res.status(200).json({
            category: req.category
        })
    }

    create = async (req, res, next) => {
        sequelize.inTransaction(async transaction => {
            return await models.Category.create({
                title: req.body.title,
                content: req.body.content
            }, { transaction })
        })
            .then(category => {
                res.status(201).json({
                    message: `Category is created`,
                    category: sanitize(category)
                })
            })
            .catch(err => {
                transactionErrorHandler(retryError(this.create, err), req, res, next)
            })
    }

    edit = async (req, res, next) => {
        sequelize.inTransaction(async transaction => {
            return await req.category.update({
                title: req.body.title,
                content: req.body.content
            }, { transaction })
        })
            .then(category => {
                res.status(200).json({
                    message: `Category is edited`,
                    category: sanitize(category)
                })
            })
            .catch(err => {
                transactionErrorHandler(retryError(this.edit, err), req, res, next)
            })
    }

    delete = async (req, res, next) => {
        sequelize.inTransaction(async transaction => {
            await req.category.destroy({ transaction })
        })
            .then(() => {
                res.status(200).json({
                    message: `Category is deleted`
                })
            })
            .catch(err => {
                transactionErrorHandler(retryError(this.delete, err), req, res, next)
            })
    }
}

export default new CategoriesController()