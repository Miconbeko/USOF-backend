import sequelize from "../database/db.js";
import { transactionErrorHandler } from "../errors/handlers.js";
import retryError from "../errors/RetryError.js";
import getPaginationData from "../utils/getPaginationData.js";

const Op = sequelize.Sequelize.Op
const models = sequelize.models;

class UsersController {
    getAll = async (req, res, next) => {
        sequelize.inTransaction(async transaction => {
            return await models.User.findAndCountAll({
                order: [[`login`, `DESC`]],
                offset: req.page.offset,
                limit: req.page.limit,
                transaction
            })
        })
            .then(result => {
                const data = getPaginationData(result, req.query.page, req.query.size)

                res.status(200).json({
                    pagination: data.metadata,
                    users: data.items
                })
            })
            .catch(err => {
                transactionErrorHandler(retryError(this.getAll, err), req, res, next)
            })
    }

    getOne = async (req, res, next) => {
        res.status(200).json({
            user: req.user
        })
    }
}

export default new UsersController()