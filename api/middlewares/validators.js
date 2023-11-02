const createObligatoryValidator = require(`./validators/createObligatoryValidator`)

const registerValidator = require(`./validators/registerValidator`)
const loginOrEmailValidator = require(`./validators/loginOrEmailValidator`)
const queryTokenValidator = require(`./validators/queryTokenValidator`)

const passwordValidator = createObligatoryValidator(`password`)
const codeValidator = createObligatoryValidator(`code`, `E-mail verification code`)
const tokenValidator = createObligatoryValidator(`token`)

module.exports = {
    registerValidator,
    passwordValidator: [passwordValidator],
    loginOrEmailValidator: [loginOrEmailValidator],
    loginInValidator: [loginOrEmailValidator, passwordValidator],
    codeValidator: [codeValidator],
    tokenValidator: [tokenValidator],
    queryTokenValidator
}