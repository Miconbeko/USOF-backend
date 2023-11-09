import express from "express"
import { default as upload, compressImage } from "../middlewares/imageUploader.js";
import AuthController from "../controllers/AuthController.js";

import { getUserByLogin, getDataFromToken, getUserByToken } from "../middlewares/getters.js";

import { passwordRegisterValidator, loginRegisterValidator, emailRegisterValidator,
        registerValidator, loginOrEmailValidator, loginInValidator,
        tokenValidator, queryTokenValidator} from "../middlewares/validators.js";

import { checkEmailOrLoginExists, checkVerified, checkNotVerified,
        checkPassword, checkToken, checkTokenVerify,
        checkTokenPswReset, checkTokenSession } from "../middlewares/checkers.js";

import { validationErrorHandler } from "../errors/handlers.js"


const router = express.Router()

router.post(`/register`, upload.singleWithHandler(`avatar`), registerValidator, validationErrorHandler, checkEmailOrLoginExists, compressImage, AuthController.register)
router.patch(`/verify/:token`, queryTokenValidator, validationErrorHandler, getDataFromToken, getUserByToken, checkTokenVerify, checkNotVerified, AuthController.verifyEmail)
router.post(`/verify-resend`, loginInValidator, validationErrorHandler, getUserByLogin, checkPassword, checkNotVerified, AuthController.sendVerifyToken)
router.post(`/login`, loginInValidator, validationErrorHandler, getUserByLogin, checkPassword, checkVerified, AuthController.login)
router.delete(`/logout`, tokenValidator, validationErrorHandler, getDataFromToken, getUserByToken, checkTokenSession, AuthController.logout)
router.delete(`/logout/all`, tokenValidator, validationErrorHandler, getDataFromToken, getUserByToken, checkTokenSession, AuthController.fullLogout)
router.post(`/password-reset`, loginOrEmailValidator, validationErrorHandler, getUserByLogin, checkVerified, AuthController.sendPswResetToken)
router.patch(`/password-reset/:token`, queryTokenValidator, passwordRegisterValidator, validationErrorHandler, getDataFromToken, getUserByToken, checkTokenPswReset, AuthController.changePassword)

export default router

