const jwt = require(`jsonwebtoken`)
const sequelize = require(`../database/db`)
const codeGenerator = require(`../utils/codeGenerator`)

const models = sequelize.models;

class AuthController {
    register(req, res, next) {  // TODO: Maybe create middleware for this
        const verificationCode = codeGenerator(5)

        models.User.create({
            login: req.body.login,
            password: req.body.password,
            email: req.body.email,
            avatar: req.filePath,
            verificationCode: verificationCode
        })
            .then((user) => {
                return res.status(201).json({
                    message: `Registration complete`,
                    user: user
                })
            })
    }

    verify(req, res, next) {
        req.user.update({
            verified: true
        })

        res.status(200).json({
            message: `E-mail is verified`
        })
    }

    resendCode(req, res, next) {
        const verificationCode = codeGenerator(5)

        req.user.update({
            verificationCode: verificationCode
        })

        res.status(200).json({
            message: `Validation code is resented`
        })
    }

    login(req, res, next) {
        const token = jwt.sign({
            id: req.user.id
        }, process.env.JWT_KEY, { expiresIn: '1d' })

        req.user.update({
            token: token
        })

        res.status(200).json({
            message: `Login successful`,
            token: token
        })
    }

    logout(req, res, next) {
        req.user.update({
            token: null
        })

        res.status(200).json({
            message: `Logout successful`
        })
    }
}

module.exports = new AuthController()