import { body } from "express-validator"

export default (field, fieldName) => {
    if (!fieldName)
        fieldName = field.slice(0, 1).toUpperCase() + field.slice(1).toLowerCase()

    return body(field, `${fieldName} is obligatory field`)
        .exists()
        .trim()
        .notEmpty()
        .escape()
}