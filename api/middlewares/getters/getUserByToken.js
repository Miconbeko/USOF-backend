const sequelize = require(`../../database/db`)
const ServerError = require(`../../errors/ServerError`)

const models = sequelize.models

module.exports = async (req, res, next) => {
    const user = await models.User.findOne({
        where: {
            id: req.token.id
        }
    })

    if (user === null)
        next(new ServerError(`Invalid or expired token`, 401))

    req.user = user
    next()
}