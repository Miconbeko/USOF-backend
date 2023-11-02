const sequelize = require(`../../database/db`)
const ServerError = require(`../../errors/ServerError`)

const models = sequelize.models

module.exports = async (req, res, next) => {
    const token = await models.Token.findOne({
        where: {
            id: req.token.tokenId
        }
    })
    const user = await token?.getOwner()

    if (!token || !user)
        return next(new ServerError(`Invalid or expired token`, 401))

    user.token = token
    req.user = user
    next()
}