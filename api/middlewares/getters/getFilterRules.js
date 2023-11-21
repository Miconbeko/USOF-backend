import ServerError from "../../errors/ServerError.js";
import sequelize from "../../database/db.js";

const models = sequelize.models;


const rules = {
    users: {
        admins: {
            where: {
                role: `admin`
            }
        },
        users: {
            where: {
                role: `user`
            }
        }
    },
    posts:  {
        nocomments: {
            include: [{
                model: models.Comment,
                required: false
            }],
            where: {
                '$Comments.id$': null
            }
        },
        categories: {
            include: [{
                model: models.Categories,
            }],
            where: {

            }
        }
    }
}

export default function getFilterRules(rulesName) {
    return (req, res, next) => {
        try {
            const settings = []

            if (req.body.sort)
                for (const param of  Object.keys(req.body.sort)) {
                    const rule = rules[rulesName][param]

                    if (!rule)
                        return next(new ServerError(`Filter rule "${param}" can't be applied to "${rulesName}"`, 400))

                    settings.push(rule)
                }

            req.settings = settings
            next()
        } catch (err) {
            return next(new ServerError(`${rulesName} sort rules went wrong`, 500))
        }
    }
}