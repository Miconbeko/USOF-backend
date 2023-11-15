import express from "express"
import {
    commentCreationValidator,
    paginationValidator,
    paramIdValidator,
    postCreationValidator,
    timerValidator,
    tokenValidator
} from "../../middlewares/validators.js";
import {validationErrorHandler} from "../../errors/handlers.js";
import PostsController from "../../controllers/PostsController.js";
import {getDataFromToken, getPaginationParams, getPostById, getUserByToken} from "../../middlewares/getters.js";
import {checkAdmin, checkLocked, checkNotLocked, checkOwner, checkTokenSession} from "../../middlewares/checkers.js";
import getCategoriesByIds from "../../middlewares/getters/getCategoriesByIds.js";


const router = express.Router()


router.post(`/`,                postCreationValidator, tokenValidator, validationErrorHandler, getDataFromToken, getUserByToken, checkTokenSession, getCategoriesByIds, PostsController.create)
router.post(`/:id/comments`,    paramIdValidator, commentCreationValidator, tokenValidator, validationErrorHandler, getDataFromToken, getUserByToken, checkTokenSession, getPostById, checkNotLocked, PostsController.createComment)

router.put(`/:id`,              paramIdValidator, postCreationValidator, tokenValidator, validationErrorHandler, getDataFromToken, getUserByToken, checkTokenSession, getPostById, checkOwner, checkNotLocked, getCategoriesByIds, PostsController.edit)

router.patch(`/:id/lock`,       paramIdValidator, timerValidator, tokenValidator, validationErrorHandler, getDataFromToken, getUserByToken, checkTokenSession, checkAdmin, getPostById, PostsController.lock)
router.delete(`/:id/lock`,      paramIdValidator, tokenValidator, validationErrorHandler, getDataFromToken, getUserByToken, checkTokenSession, checkAdmin, getPostById, checkLocked, PostsController.unlock)

router.get(`/`,                 paginationValidator, validationErrorHandler, getPaginationParams, PostsController.getAll)
router.get(`/:id`,              paramIdValidator, validationErrorHandler, getPostById, PostsController.getOne)
router.get(`/:id/comments`,     paramIdValidator, paginationValidator, validationErrorHandler, getPaginationParams, getPostById, PostsController.getComments)

router.delete(`/:id`,           paramIdValidator, tokenValidator, validationErrorHandler, getDataFromToken, getUserByToken, checkTokenSession, getPostById, checkOwner, PostsController.delete)

export default router
