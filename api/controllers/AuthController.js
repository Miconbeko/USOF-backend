import sequelize from "../database/db.js";
import retryError from "../errors/RetryError.js";

import { transactionErrorHandler } from "../errors/handlers.js";
import createToken from "../utils/createToken.js";

const Op = sequelize.Sequelize.Op
const models = sequelize.models

class AuthController {
    register = (req, res, next) => {  // TODO: Maybe create middleware for this
        sequelize.inTransaction(async transaction => {
            const user = await models.User.create({
                login: req.body.login,
                password: req.body.password,
                email: req.body.email,
                fullName: req.body.fullName,
                avatar: req.filePath,
                role: `admin` //TODO: Change this!!!! only for testing
            }, { transaction })

            const token = await createToken(`verify`, req.body.redirectUrl, user, transaction)

            return { user, token }
        })
            .then(result => {
                return res.status(201).json({
                    message: `Registration complete`,
                    user: result.user.toJSON(),
                    token: result.token.token
                })
            })
            .catch(err => {
                return transactionErrorHandler(retryError(this.register, err), req, res, next)
            })

        // TODO: replace `:token` witn the generated token to form url for e-mail verifiaction. Then send it to user e-mail
    }

    adminRegister = async (req, res, next) => {
        sequelize.inTransaction(async transaction => {
            return await models.User.create({
                login: req.body.login,
                password: req.body.password,
                email: req.body.email,
                fullName: req.body.fullName,
                avatar: req.filePath,
                role: req.body.role,
                verified: true
            }, { transaction })
        })
            .then(result => {
                return res.status(201).json({
                    message: `Registration complete`,
                    user: result.toJSON()
                })
            })
            .catch(err => {
                return transactionErrorHandler(retryError(this.register, err), req, res, next)
            })
    }

    verifyEmail = async (req, res, next) => {
        sequelize.inTransaction(async transaction => {
            await Promise.all([
                req.user.update({
                    verified: true
                }, { transaction }),

                models.Token.destroy({
                    where: {
                        userId: req.user.id
                    },
                    transaction
                })
            ])
        })
            .then(() => {
                res.status(200).json({
                    message: `E-mail is verified`
                })
            })
            .catch(err => {
                return transactionErrorHandler(retryError(this.verifyEmail, err), req, res, next)
            })
    }

    sendVerifyToken = async (req, res, next) => {
        sequelize.inTransaction(async transaction => {
            await models.Token.destroy({
                where: {
                    userId: req.user.id,
                    type: `verify`
                },
                transaction,
            })

            return await createToken(`verify`, req.body.redirectUrl, req.user, transaction)
        })
            .then(token => {
                return res.status(200).json({
                    message: `Validation link is send`,
                    token: token.token
                })
            })
            .catch(err => {
                return transactionErrorHandler(retryError(this.sendVerifyToken, err), req, res, next)
            })

        // TODO: replace `:token` witn the generated token to form url for e-mail verifiaction. Then send it to user e-mail
    }

    sendPswResetToken = async (req, res, next) => {
        sequelize.inTransaction(async transaction => {
            await models.Token.destroy({
                where: {
                    userId: req.user.id,
                    type: `pswReset`
                },
                transaction
            })

            return await createToken(`pswReset`, req.body.redirectUrl, req.user, transaction)
        })
            .then(token => {
                return res.status(200).json({
                    message: `Password reset link is send`,
                    token: token.token
                })
            })
            .catch(err => {
                return transactionErrorHandler(retryError(this.sendPswResetToken, err), req, res, next)
            })

        // TODO: replace `:token` witn the generated token to form url for e-mail verifiaction. Then send it to user e-mail
    }

    login = async (req, res, next) => {
        sequelize.inTransaction(async transaction => {
            return await createToken(`session`, null, req.user, transaction)
        })
            .then(token => {
                res.status(200).json({
                    message: `Login successful`,
                    token: token.token
                })
            })
            .catch(err => {
                return transactionErrorHandler(retryError(this.login, err), req, res, next)
            })
    }

    logout = async (req, res, next) => {
        sequelize.inTransaction(async transaction => {
            await req.user.token.destroy(transaction)
        })
            .then(() => {
                res.status(200).json({
                    message: `Logout successful`
                })
            })
            .catch(err => {
                return transactionErrorHandler(retryError(this.logout, err), req, res, next)
            })
    }

    fullLogout = async (req, res, next) => {
        sequelize.inTransaction(async transaction => {
            await models.Token.destroy({
                where: {
                    userId: req.user.id,
                    type: `session`
                },
                transaction
            })
        })
            .then(() => {
                res.status(200).json({
                    message: `Full logout successful`
                })
            })
            .catch(err => {
                return transactionErrorHandler(retryError(this.fullLogout, err), req, res, next)
            })
    }

    changePassword = async (req, res, next) => {
        sequelize.inTransaction(async (transaction) => {
            await Promise.all([
                req.user.update({
                    password: req.body.password
                }, { transaction }),

                 models.Token.destroy({
                    where: {
                        userId: req.user.id
                    },
                    transaction
                })
            ])
        })
            .then(() => {
                res.status(202).json({
                    message: "Password changed"
                })
            })
            .catch(err => {
                return transactionErrorHandler(retryError(this.changePassword, err), req, res, next)
            })
    }
}

export default new AuthController()