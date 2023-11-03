const { body } = require(`express-validator`)

module.exports = [
    body(`email`, `E-mail is obligatory field`)
        .exists()
        .trim()
        .isEmail()
        .withMessage(`Should looks like e-mail`)
        .isLength({ max: 255 })
        .withMessage(`E-mail max length is 255`)
        .escape(),
];