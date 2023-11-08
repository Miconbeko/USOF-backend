const express = require(`express`)
const upload = require(`../middlewares/imageUploader`)

const AuthController = require(`../controllers/AuthController`)

const
    {
        getUserByLogin,
        getDataFromToken,
        getUserByToken
    } = require(`../middlewares/getters`)

const
    {
        passwordRegisterValidator,
        loginRegisterValidator,
        emailRegisterValidator,
        registerValidator,
        loginOrEmailValidator,
        loginInValidator,
        tokenValidator,
        queryTokenValidator
    } = require(`../middlewares/validators`)

const
    {
        checkEmailOrLoginExists,
        checkVerified,
        checkNotVerified,
        checkPassword,
        checkToken,
        checkTokenVerify,
        checkTokenPswReset,
        checkTokenSession
    } = require(`../middlewares/checkers`)

const
    {
        validationErrorHandler
    } = require(`../errors/handlers`)

const router = express.Router()

router.post(`/register`, upload.singleWithHandler(`avatar`), ...registerValidator, validationErrorHandler, checkEmailOrLoginExists, AuthController.register)
router.patch(`/verify/:token`, queryTokenValidator, validationErrorHandler, getDataFromToken, getUserByToken, checkTokenVerify, checkNotVerified, AuthController.verifyEmail)
router.post(`/verify-resend`, loginInValidator, validationErrorHandler, getUserByLogin, checkPassword, checkNotVerified, AuthController.sendVerifyToken)
router.post(`/login`, loginInValidator, validationErrorHandler, getUserByLogin, checkPassword, checkVerified, AuthController.login)
router.delete(`/logout`, tokenValidator, validationErrorHandler, getDataFromToken, getUserByToken, checkTokenSession, AuthController.logout)
router.delete(`/logout/all`, tokenValidator, validationErrorHandler, getDataFromToken, getUserByToken, checkTokenSession, AuthController.fullLogout)
router.post(`/password-reset`, loginOrEmailValidator, validationErrorHandler, getUserByLogin, checkVerified, AuthController.sendPswResetToken)
router.patch(`/password-reset/:token`, queryTokenValidator, passwordRegisterValidator, validationErrorHandler, getDataFromToken, getUserByToken, checkTokenPswReset, AuthController.changePassword)

module.exports = router

