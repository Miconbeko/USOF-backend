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
                return res.status(200).json({
                    message: `registration complete`,
                    user: user
                })
            })
    }

    async login(req, res, next) {
        res.status(200).json(req.user)
    }
}

module.exports = new AuthController()