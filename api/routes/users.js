import express from "express"
import UsersController from "../controllers/UsersController.js";

import {getPaginationParams, getUserByLogin} from "../middlewares/getters.js";

import {paginationValidator, paramLoginValidator} from "../middlewares/validators.js";

import { validationErrorHandler } from "../errors/handlers.js"


const router = express.Router()

router.get('/', paginationValidator, validationErrorHandler, getPaginationParams, UsersController.getAll)
router.get(`/:login`, paramLoginValidator, validationErrorHandler, getUserByLogin, UsersController.getOne)


export default router