const { body } = require(`express-validator`)

module.exports = [
    body(`code`, `Email verification code is obligatory field`)
        .exists()
        .trim()
        .escape()
]