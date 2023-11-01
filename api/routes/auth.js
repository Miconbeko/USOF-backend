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
        checkVerified,
        checkEmailCode,
        checkPassword,
        checkToken
    } = require(`../middlewares/checkers`)

const
    {
        validationErrorHandler
    } = require(`../errors/handlers`)

const router = express.Router();

router.post(`/register`, upload.singleWithHandler(`avatar`), ...registerValidator, validationErrorHandler, AuthController.register)
router.post(`/verify`, ...loginValidator, ...codeValidator, validationErrorHandler, getUserByLogin, checkPassword, checkEmailCode, AuthController.verify)
router.post(`/login`, ...loginValidator, validationErrorHandler, getUserByLogin, checkPassword, checkVerified, AuthController.login);
router.delete(`/logout`, ...tokenValidator, validationErrorHandler, getDataFromToken, getUserByToken, checkToken, AuthController.logout)

module.exports = router

