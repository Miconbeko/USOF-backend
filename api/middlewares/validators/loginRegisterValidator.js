const { body } = require(`express-validator`)

module.exports = [
    body(`login`, `Login is obligatory field`)
        .exists()
        .trim()
        .isAlphanumeric()
        .withMessage(`Login must contains only alphabetic and digit symbols`)
        .isLength({ min: 5, max: 40 })
        .withMessage(`Login length should be more than 5 and less than 40`)
        .escape(),
];