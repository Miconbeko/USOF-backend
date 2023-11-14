import express from "express"
import UsersController from "../../controllers/UsersController.js";

import {getDataFromToken, getPaginationParams, getUserByLogin, getUserByToken} from "../../middlewares/getters.js";

import {
    fullNameRegisterValidator,
    paginationValidator,
    paramLoginValidator, paramTokenValidator,
    tokenValidator
} from "../../middlewares/validators.js";

import { validationErrorHandler } from "../../errors/handlers.js"
import upload, {compressImage} from "../../middlewares/imageUploader.js";
import {checkTokenDelete, checkTokenSession} from "../../middlewares/checkers.js";


const router = express.Router()

router.get('/',                 paginationValidator, validationErrorHandler, getPaginationParams, UsersController.getAll)
router.get(`/:login`,           paramLoginValidator, validationErrorHandler, getUserByLogin, UsersController.getOne)
router.patch(`/`,               upload.singleWithHandler(`avatar`), fullNameRegisterValidator, tokenValidator, validationErrorHandler, getDataFromToken, getUserByToken, checkTokenSession, compressImage, UsersController.changeInfo)
router.post(`/delete`,          tokenValidator, validationErrorHandler, getDataFromToken, getUserByToken, checkTokenSession, UsersController.sendDeleteToken)
router.delete(`/delete/:token`, paramTokenValidator, validationErrorHandler, getDataFromToken, getUserByToken, checkTokenDelete, UsersController.delete)

export default router