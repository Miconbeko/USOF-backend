import { body } from "express-validator"

export default [
    body(`content`, `Title is obligatory field`)
        .exists()
        .trim()
        .isLength({ min: 10, max: 65530})
        .withMessage(`Content length should be more than 10 and less than 65530`)
        .escape()
]