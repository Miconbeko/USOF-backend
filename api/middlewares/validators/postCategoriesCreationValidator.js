import { body } from "express-validator"

export default [
    body(`categories`, `Categories is obligatory field`)
        .exists()
        .bail()
        .isArray({ min: 1, max: 10 })
        .withMessage(`Categories should be an array and have from 1 to 10 category ids`),
    body(`categories.*`, `Element of "categories" array must be integer`)
        .isInt()
]