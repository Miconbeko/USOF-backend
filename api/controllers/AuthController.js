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
            type: `verify`
        })
        token.setUser(user)

        return res.status(201).json({
            message: `Registration complete`,
            user: user.toJSON(),
            token: token.token
        })
    }

    verify(req, res, next) {
        req.user.update({
            verificationCode: null,
            verified: true
        })

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

    login(req, res, next) {
        const sessionId = uuid()
        const token = jwt.sign({
            id: req.user.id,
            type: `session`
        }, process.env.JWT_KEY, {
            expiresIn: '1d',
            jwtid: sessionId
        })

        req.user.update({
            sessionId: sessionId
        })

        res.status(200).json({
            message: `Login successful`,
            token: token
        })
    }

    logout(req, res, next) {
        req.user.update({
            sessionId: null
        })

        res.status(200).json({
            message: `Logout successful`
        })
    }
}

module.exports = new AuthController()