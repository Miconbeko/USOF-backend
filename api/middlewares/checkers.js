const checkEmailOrLoginExists = require(`./checkers/checkEmailOrLoginExists`)
const checkVerified = require(`./checkers/checkVerified`)
const checkNotVerified = require(`./checkers/checkNotVerified`)
const checkEmailCode = require(`./checkers/checkEmailCode`)
const checkPassword = require(`./checkers/checkPassword`)
const checkToken = require(`./checkers/checkToken`)

module.exports = {
    checkEmailOrLoginExists,
    checkVerified,
    checkNotVerified,
    checkEmailCode,
    checkPassword,
    checkToken
}