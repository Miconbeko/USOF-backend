const express = require(`express`)
const upload = require(`../middlewares/imageUploader`)

const AuthController = require(`../controllers/AuthController`)

const { getUserByLogin } = require(`../middlewares/getters`)

const
    {
        registerValidator,
        loginValidator,
        verifyValidator,
        codeValidator,
        passwordValidator
    } = require(`../middlewares/validators`)

const { validationErrorHandler } = require(`../errors/handlers`)

const router = express.Router();

router.post(`/register`, upload.singleWithHandler(`avatar`), ...registerValidator, validationErrorHandler, AuthController.register)
router.post(`/verify`, ...loginValidator, validationErrorHandler, getUserByLogin, passwordValidator, codeValidator, AuthController.verify)
router.post(`/login`, ...loginValidator, validationErrorHandler, getUserByLogin, passwordValidator, verifyValidator, AuthController.login);

module.exports = router

