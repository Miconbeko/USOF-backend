import express from "express"
import {
    commentCreationValidator,
    paginationValidator,
    paramIdValidator,
    postCreationValidator,
    tokenValidator
} from "../../middlewares/validators.js";
import {validationErrorHandler} from "../../errors/handlers.js";
import PostsController from "../../controllers/PostsController.js";
import {getDataFromToken, getPaginationParams, getPostById, getUserByToken} from "../../middlewares/getters.js";
import {checkOwner, checkTokenSession} from "../../middlewares/checkers.js";
import getCategoriesByIds from "../../middlewares/getters/getCategoriesByIds.js";


const router = express.Router()


router.post(`/`,                postCreationValidator, tokenValidator, validationErrorHandler, getDataFromToken, getUserByToken, checkTokenSession, getCategoriesByIds, PostsController.create)
router.post(`/:id/comments`,    paramIdValidator, commentCreationValidator, tokenValidator, validationErrorHandler, getDataFromToken, getUserByToken, checkTokenSession, getPostById, PostsController.createComment)

router.put(`/:id`,              paramIdValidator, postCreationValidator, tokenValidator, validationErrorHandler, getDataFromToken, getUserByToken, getPostById, checkTokenSession, checkOwner, getCategoriesByIds, PostsController.edit)

router.get(`/`,                 paginationValidator, validationErrorHandler, getPaginationParams, PostsController.getAll)
router.get(`/:id`,              paramIdValidator, validationErrorHandler, getPostById, PostsController.getOne)
router.get(`/:id/comments`,     paramIdValidator, paginationValidator, validationErrorHandler, getPaginationParams, getPostById, PostsController.getComments)


export default router
