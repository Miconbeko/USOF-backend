import { body } from "express-validator"

export default [
    body(`categories`, `Categories is obligatory field`)
        .exists()
        .bail()
        .isArray({ min: 1 })
        .withMessage(`Categories should be an array and have at least 1 category id`),
    body(`categories.*`, `Element of "categories" array must be integer`)
        .isInt()
]