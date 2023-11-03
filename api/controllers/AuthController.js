const jwt = require(`jsonwebtoken`)
const { v4: uuid } = require(`uuid`)
const sequelize = require(`../database/db`)
const codeGenerator = require(`../utils/codeGenerator`)

const models = sequelize.models;

class AuthController {
    async register(req, res, next) {  // TODO: Maybe create middleware for this
        const user = await models.User.create({
            login: req.body.login,
            password: req.body.password,
            email: req.body.email,
            avatar: req.filePath,
        })

        const token = await models.Token.create({
            type: `verify`,
            redirectUrl: req.body.redirectUrl
        })
        token.setOwner(user)

        // TODO: replace `:token` witn the generated token to form url for e-mail verifiaction. Then send it to user e-mail

        return res.status(201).json({
            message: `Registration complete`,
            user: user.toJSON(),
            token: token.token
        })
    }

    verifyEmail(req, res, next) {
        req.user.update({
            verified: true
        })
        req.user.token.destroy()

        res.status(200).json({
            message: `E-mail is verified`
        })
    }

    sendCode(req, res, next) {
        const verificationCode = codeGenerator(5)

        req.user.update({
            verificationCode: verificationCode
        })

        res.status(200).json({
            message: `Validation code is send`
        })
    }

    async login(req, res, next) {
        await models.Token.destroy({
            where: {
                type: `session`,
                userId: req.user.id
            }
        })

        const token = await models.Token.create({
            type: `session`
        })
        token.setOwner(req.user)

        res.status(200).json({
            message: `Login successful`,
            token: token.token
        })
    }

    async logout(req, res, next) {
        await models.Token.destroy({
            where: {
                type: `session`,
                userId: req.user.id
            }
        })

        res.status(200).json({
            message: `Logout successful`
        })
    }
}

module.exports = new AuthController()