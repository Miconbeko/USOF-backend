import { body } from "express-validator"

export default [
    body(`email`, `E-mail is obligatory field`)
        .exists()
        .trim()
        .isEmail()
        .withMessage(`Should looks like e-mail`)
        .isLength({ max: 255 })
        .withMessage(`E-mail max length is 255`)
        .escape(),
];