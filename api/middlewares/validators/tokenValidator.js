const { body } = require(`express-validator`)

module.exports = [
    body(`token`, `Token is obligatory field`)
        .exists()
        .trim()
        .escape()
]