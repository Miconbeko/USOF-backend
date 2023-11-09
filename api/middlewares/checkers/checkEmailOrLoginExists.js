import sequelize from "../../database/db.js";
import ServerError from "../../errors/ServerError.js";

const Op = sequelize.Sequelize.Op
const models = sequelize.models

export default async (req, res, next) => {
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
        return next(new ServerError(`E-mail already in use`, 409))

    if (user?.login === req.body.login)
        return next(new ServerError(`Login already in use`, 409))

    next()
}