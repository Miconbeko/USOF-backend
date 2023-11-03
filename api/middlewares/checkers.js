const createTokenTypeChecker = require(`./checkers/createTokenTypeChecker`)

const checkEmailOrLoginExists = require(`./checkers/checkEmailOrLoginExists`)
const checkVerified = require(`./checkers/checkVerified`)
const checkNotVerified = require(`./checkers/checkNotVerified`)
const checkPassword = require(`./checkers/checkPassword`)
const checkToken = require(`./checkers/checkToken`)

const checkTokenTypeVerify = createTokenTypeChecker(`verify`)
const checkTokenTypePswReset = createTokenTypeChecker(`pswReset`)
const checkTokenTypeSession = createTokenTypeChecker(`session`)

module.exports = {
    checkEmailOrLoginExists,
    checkVerified,
    checkNotVerified,
    checkPassword,
    checkToken,
    checkTokenVerify: [checkToken, checkTokenTypeVerify],
    checkTokenPswReset: [checkToken, checkTokenTypePswReset],
    checkTokenSession: [checkToken, checkTokenTypeSession],
}