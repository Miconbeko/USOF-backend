const express = require(`express`)
const upload = require(`../middlewares/imageUploader`)

const AuthController = require(`../controllers/AuthController`)

const { getUserByLogin } = require(`../middlewares/getters`)

const { registerValidator, loginValidator } = require(`../validators/validators`)
const { validationErrorHandler } = require(`../errors/handlers`)

const router = express.Router();

router.post(`/register`, upload.singleWithHandler(`avatar`), ...registerValidator, validationErrorHandler, AuthController.register)
router.post(`/login`, ...loginValidator, validationErrorHandler, getUserByLogin, AuthController.login);

module.exports = router

