import express from "express"
import {
    commentCreationValidator,
    paginationValidator,
    paramIdValidator,
    postCreationValidator,
    tokenValidator
} from "../middlewares/validators.js";
import {validationErrorHandler} from "../errors/handlers.js";
import PostsController from "../controllers/PostsController.js";
import {getDataFromToken, getPaginationParams, getPostById, getUserByToken} from "../middlewares/getters.js";
import {checkTokenSession} from "../middlewares/checkers.js";


const router = express.Router()

router.post(`/`, postCreationValidator, tokenValidator, validationErrorHandler, getDataFromToken, getUserByToken, checkTokenSession, PostsController.create)
router.get(`/`, paginationValidator, validationErrorHandler, getPaginationParams, PostsController.getAll)
router.get(`/:id`, paramIdValidator, validationErrorHandler, getPostById, PostsController.getOne)
router.get(`/:id/comments`, paramIdValidator, paginationValidator, validationErrorHandler, getPaginationParams, getPostById, PostsController.getComments)
router.post(`/:id/comments`, paramIdValidator, tokenValidator, commentCreationValidator, validationErrorHandler, getDataFromToken, getUserByToken, getPostById, checkTokenSession, PostsController.createComment)


export default router
