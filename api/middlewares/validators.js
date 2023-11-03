const createObligatoryValidator = require(`./validators/createObligatoryValidator`)

const passwordRegisterValidator = require(`./validators/passwordRegisterValidator`)
const loginRegisterValidator = require(`./validators/loginRegisterValidator`)
const emailRegisterValidator = require(`./validators/emailRegisterValidator`)
const loginOrEmailValidator = require(`./validators/loginOrEmailValidator`)
const queryTokenValidator = require(`./validators/queryTokenValidator`)

const passwordValidator = createObligatoryValidator(`password`)
const tokenValidator = createObligatoryValidator(`token`)

module.exports = {
    passwordRegisterValidator,
    loginRegisterValidator,
    emailRegisterValidator,
    registerValidator: [passwordRegisterValidator, loginRegisterValidator, emailRegisterValidator],
    loginOrEmailValidator,
    loginInValidator: [loginOrEmailValidator, passwordValidator],
    tokenValidator: [tokenValidator],
    queryTokenValidator
}