const jwt = require(`jsonwebtoken`)
const { v4: uuid } = require(`uuid`)
const sequelize = require(`../database/db`)
const codeGenerator = require(`../utils/codeGenerator`)

const Op = sequelize.Sequelize.Op
const models = sequelize.models;

class AuthController {
    createToken = async (type, redirectUrl, owner) => {
        const token = await models.Token.create({
            type,
            redirectUrl
        })
        token.setOwner(owner)

        return token
    }

    register = async (req, res, next) => {  // TODO: Maybe create middleware for this
        const user = await models.User.create({
            login: req.body.login,
            password: req.body.password,
            email: req.body.email,
            avatar: req.filePath,
        })

        const token = await this.createToken(`verify`, req.body.redirectUrl, user)

        // TODO: replace `:token` witn the generated token to form url for e-mail verifiaction. Then send it to user e-mail

        return res.status(201).json({
            message: `Registration complete`,
            user: user.toJSON(),
            token: token.token
        })
    }

    verifyEmail = async (req, res, next) => {
        req.user.update({
            verified: true
        })
        models.Token.destroy({
            where: {
                userId: req.user.id
            }
        })

        res.status(200).json({
            message: `E-mail is verified`
        })
    }

    sendVerifyToken = async (req, res, next) => {
        await models.Token.destroy({
            where: {
                userId: req.user.id,
                type: `verify`
            }
        })

        const token = await this.createToken(`verify`, req.body.redirectUrl, req.user)

        // TODO: replace `:token` witn the generated token to form url for e-mail verifiaction. Then send it to user e-mail

        return res.status(200).json({
            message: `Validation link is send`,
            token: token.token
        })
    }

    sendPswResetToken = async (req, res, next) => {
        await models.Token.destroy({
            where: {
                userId: req.user.id,
                type: `pswReset`
            }
        })

        const token = await this.createToken(`pswReset`, req.body.redirectUrl, req.user)

        // TODO: replace `:token` witn the generated token to form url for e-mail verifiaction. Then send it to user e-mail

        return res.status(200).json({
            message: `Password reset link is send`,
            token: token.token
        })
    }

    login = async (req, res, next) => {
        const token = await this.createToken(`session`, null, req.user)

        res.status(200).json({
            message: `Login successful`,
            token: token.token
        })
    }

    logout = async (req, res, next) => {
        req.user.token.destroy()

        res.status(200).json({
            message: `Logout successful`
        })
    }

    changePassword = async (req, res, next) => {
        req.user.update({
            password: req.body.password
        })
        models.Token.destroy({
            where: {
                userId: req.user.id
            }
        })

        res.status(202).json({
            message: "Password changed"
        })
    }
}

module.exports = new AuthController()