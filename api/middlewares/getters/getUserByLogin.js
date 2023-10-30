const sequelize = require(`../../database/db`)
const ServerError = require(`../../errorHandlers/ServerError`)

const Op = sequelize.Sequelize.Op
const models = sequelize.models;

async function getUserByLogin(req, res, next) {
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
        next(new ServerError(`User not found`, 404))

    req.user = user
    next()
}

module.exports = getUserByLogin