const { body } = require(`express-validator`)

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
        .escape(),
    body(`email`, `E-mail is obligatory field`)
        .exists()
        .trim()
        .isEmail()
        .withMessage(`Should looks like e-mail`)
        .isLength({ max: 255 })
        .withMessage(`E-mail max length is 255`)
        .escape(),
    body(`password`,`Password is obligatory field`)
        .exists()
        .isLength({ min: 5, max: 255 })
        .withMessage(`Login length should be mre than 5 and less than 255`)
        .escape(),
    body(`repeatPassword`, `Confirmed password is obligatory field`)
        .exists()
        .withMessage(`Password confirmation should be provided`)
        .custom(equalPasswords)
        .escape(),
];