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
        passwordValidator,
        loginOrEmailValidator,
        registerValidator,
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
        checkToken
    } = require(`../middlewares/checkers`)

const
    {
        validationErrorHandler
    } = require(`../errors/handlers`)

const router = express.Router()

router.post(`/register`, upload.singleWithHandler(`avatar`), ...registerValidator, validationErrorHandler, checkEmailOrLoginExists, AuthController.register)
router.post(`/verify/:token`, ...queryTokenValidator, validationErrorHandler, getDataFromToken, getUserByToken, checkToken, checkNotVerified, AuthController.verifyEmail)
router.post(`/resend-code`, ...loginInValidator, validationErrorHandler, getUserByLogin, checkPassword, checkNotVerified, AuthController.sendCode)
router.post(`/login`, ...loginInValidator, validationErrorHandler, getUserByLogin, checkPassword, checkVerified, AuthController.login)
router.post(`/logout`, ...tokenValidator, validationErrorHandler, getDataFromToken, getUserByToken, checkToken, AuthController.logout)
router.post(`/password-reset`, ...loginOrEmailValidator, validationErrorHandler, getUserByLogin, checkVerified, AuthController.sendCode)
router.post(`/password-reset/`)

module.exports = router

