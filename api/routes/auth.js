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
        registerValidator,
        loginValidator,
        codeValidator,
        tokenValidator
    } = require(`../middlewares/validators`)

const
    {
        checkEmailOrLoginExists,
        checkVerified,
        checkNotVerified,
        checkEmailCode,
        checkPassword,
        checkToken
    } = require(`../middlewares/checkers`)

const
    {
        validationErrorHandler
    } = require(`../errors/handlers`)

const router = express.Router();

router.post(`/register`, upload.singleWithHandler(`avatar`), ...registerValidator, validationErrorHandler, checkEmailOrLoginExists, AuthController.register)
router.post(`/verify`, ...loginValidator, ...codeValidator, validationErrorHandler, getUserByLogin, checkPassword, checkNotVerified, checkEmailCode, AuthController.verify)
router.post(`/resend-code`, ...loginValidator, validationErrorHandler, getUserByLogin, checkPassword, checkNotVerified, AuthController.resendCode)
router.post(`/login`, ...loginValidator, validationErrorHandler, getUserByLogin, checkPassword, checkVerified, AuthController.login);
router.post(`/logout`, ...tokenValidator, validationErrorHandler, getDataFromToken, getUserByToken, checkToken, AuthController.logout)

module.exports = router

