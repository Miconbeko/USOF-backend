const checkVerified = require(`./checkers/checkVerified`)
const checkEmailCode = require(`./checkers/checkEmailCode`)
const checkPassword = require(`./checkers/checkPassword`)
const checkToken = require(`./checkers/checkToken`)

module.exports = {
    checkVerified,
    checkEmailCode,
    checkPassword,
    checkToken
}