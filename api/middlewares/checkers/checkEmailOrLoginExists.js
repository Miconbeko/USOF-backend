const sequelize = require(`../../database/db`)
const ServerError = require(`../../errors/ServerError`)

const Op = sequelize.Sequelize.Op
const models = sequelize.models

module.exports = async (req, res, next) => {
    const user = await models.User.findOne({
        where: {
            [Op.or]: [
                {
                    login: req.body.login
                },
                {
                    email: req.body.email
                }
            ]
        }
    })

    if (user?.email === req.body.email)
        next(new ServerError(`E-mail already in use`, 409))

    if (user?.login === req.body.login)
        next(new ServerError(`Login already in use`, 409))

    next()
}