const registerValidator = require(`./validators/registerValidator`)
const loginValidator = require(`./validators/loginValidator`)
const verifyValidator = require(`./validators/verifyValidator`)
const codeValidator = require(`./validators/codeValidator`)
const passwordValidator = require(`./validators/passwordValidator`)

module.exports = {
    registerValidator,
    loginValidator,
    verifyValidator,
    codeValidator,
    passwordValidator
}