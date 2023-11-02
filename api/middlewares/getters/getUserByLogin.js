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

    if (user === null)
        return next(new ServerError(`Invalid login or password`, 401))

    req.user = user
    next()
}