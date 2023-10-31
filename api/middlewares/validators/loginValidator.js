const { body } = require(`express-validator`)
const sequelize = require(`../../database/db`)

const loginOrEmail = async (body, { req }) => {
    if (!body.email && !body.login)
        throw new Error(`Login or Email are required`)
}

module.exports = [
    body(`password`, `Password is obligatory field`)
        .exists(),
    body()
        .custom(loginOrEmail),
    body([`login`, `email`, `password`])
        .trim()
        .escape()
]