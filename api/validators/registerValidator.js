const { body } = require(`express-validator`)
const sequelize = require(`../database/db`)

const emailIsExists = async (email) => {
    const user = await sequelize.models.User.findOne({
        where: {
            email: email
        }
    })

    if (user)
        throw new Error(`E-mail already in use`)
}

const loginIsExists = async (login) => {
    const user = await sequelize.models.User.findOne({
        where: {
            login: login
        }
    })

    if (user)
        throw new Error(`Login already in use`)
}

const equalPasswords = async (psw, { req }) => {
    if (psw !== req.body.password)
        throw new Error(`Passwords don't match`)
}

module.exports = [
    body(`login`, `Login is obligatory field`)
        .exists()
        .trim()
        .isAlphanumeric()
        .withMessage(`Login must contains only alphabetic and digit symbols`)
        .isLength({ min: 5, max: 40 })
        .withMessage(`Login length should be more than 5 and less than 40`)
        .custom(loginIsExists),
    body(`email`, `E-mail is obligatory field`)
        .exists()
        .trim()
        .isEmail()
        .isLength({ max: 255 })
        .withMessage(`E-mail max length is 255`)
        .custom(emailIsExists),
    body(`password`,`Password is obligatory field`)
        .exists()
        .isLength({ min: 5, max: 255 })
        .withMessage(`Login length should be more than 5 and less than 255`),
    body(`repeatPassword`, `Confirmed password is obligatory field`)
        .exists()
        .withMessage(`Password confirmation should be provided`)
        .custom(equalPasswords),
];