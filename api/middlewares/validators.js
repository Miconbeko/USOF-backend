const registerValidator = require(`./validators/registerValidator`)
const loginValidator = require(`./validators/loginValidator`)
const codeValidator = require(`./validators/codeValidator`)
const tokenValidator = require(`./validators/tokenValidator`)

module.exports = {
    registerValidator,
    loginValidator,
    codeValidator,
    tokenValidator
}