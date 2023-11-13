import express from "express"
import {paginationValidator, postCreationValidator, tokenValidator} from "../middlewares/validators.js";
import {validationErrorHandler} from "../errors/handlers.js";
import PostsController from "../controllers/PostsController.js";
import {getDataFromToken, getPaginationParams, getUserByToken} from "../middlewares/getters.js";
import {checkTokenSession} from "../middlewares/checkers.js";


const router = express.Router()

router.post(`/`, postCreationValidator, tokenValidator, validationErrorHandler, getDataFromToken, getUserByToken, checkTokenSession, PostsController.create)
router.get(`/`, paginationValidator, validationErrorHandler, getPaginationParams, PostsController.getAll)

export default router
