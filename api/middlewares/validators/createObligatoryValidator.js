const { body } = require(`express-validator`)

module.exports = (field, fieldName)=> {
    if (!fieldName)
        fieldName = field.slice(0, 1).toUpperCase() + field.slice(1).toLowerCase()

    return body(field, `${fieldName} is obligatory field`)
        .exists()
        .trim()
        .notEmpty()
        .escape()
}