import express from "express"
import UsersController from "../controllers/UsersController.js";

import {getDataFromToken, getPaginationParams, getUserByLogin, getUserByToken} from "../middlewares/getters.js";

import {
    fullNameRegisterValidator,
    paginationValidator,
    paramLoginValidator,
    tokenValidator
} from "../middlewares/validators.js";

import { validationErrorHandler } from "../errors/handlers.js"
import upload, {compressImage} from "../middlewares/imageUploader.js";
import {checkTokenSession} from "../middlewares/checkers.js";


const router = express.Router()

router.get('/',         paginationValidator, validationErrorHandler, getPaginationParams, UsersController.getAll)
router.get(`/:login`,   paramLoginValidator, validationErrorHandler, getUserByLogin, UsersController.getOne)
router.patch(`/`,       upload.singleWithHandler(`avatar`), fullNameRegisterValidator, tokenValidator, validationErrorHandler, getDataFromToken, getUserByToken, checkTokenSession, compressImage, UsersController.changeInfo)

export default router