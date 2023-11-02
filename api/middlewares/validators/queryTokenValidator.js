const { param } = require(`express-validator`)

const toBody = async (token, { req }) => {
    req.body.token = token
}

module.exports = [
    param(`token`, `Invalid token`)
        .exists()
        .trim()
        .custom(toBody)
        .escape()
]