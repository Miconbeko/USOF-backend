import { param } from "express-validator"

const toBody = async (token, { req }) => {
    req.body.token = token
}

export default [
    param(`token`, `Invalid token`)
        .exists()
        .trim()
        .custom(toBody)
        .escape()
]