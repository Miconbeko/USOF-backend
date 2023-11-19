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

import {getDataFromToken, getPaginationParams, getPostById, getUserByToken, getCategoriesByIds} from "../../middlewares/getters.js";

import {
    checkAdmin,
    checkLocked,
    checkNotLocked,
    checkOwner,
    checkTokenSession,
    checkNotLiked,
    checkNotDisliked,
    checkLiked,
    checkDisliked
} from "../../middlewares/checkers.js";

import PostsController from "../../controllers/PostsController.js";

import optional from "../../middlewares/getOptionalMiddleware.js";



const router = express.Router()


router.post(`/`,                postCreationValidator, tokenValidator, validationErrorHandler, getDataFromToken, getUserByToken, checkTokenSession, getCategoriesByIds, PostsController.create)
router.post(`/:id/comments`,    paramIdValidator, commentCreationValidator, tokenValidator, validationErrorHandler, getDataFromToken, getUserByToken, checkTokenSession, getPostById, checkNotLocked, PostsController.createComment)
router.post(`/:id/like`,        paramIdValidator, tokenValidator, validationErrorHandler, getDataFromToken, getUserByToken, checkTokenSession, getPostById, checkNotLocked, checkNotLiked, PostsController.like)
router.post(`/:id/dislike`,     paramIdValidator, tokenValidator, validationErrorHandler, getDataFromToken, getUserByToken, checkTokenSession, getPostById, checkNotLocked, checkNotDisliked, PostsController.dislike)

router.put(`/:id`,              paramIdValidator, postCreationValidator, tokenValidator, validationErrorHandler, getDataFromToken, getUserByToken, checkTokenSession, getPostById, checkOwner, checkNotLocked, getCategoriesByIds, PostsController.edit)

router.patch(`/:id/lock`,       paramIdValidator, timerValidator, tokenValidator, validationErrorHandler, getDataFromToken, getUserByToken, checkTokenSession, checkAdmin, getPostById, PostsController.lock)
router.delete(`/:id/lock`,      paramIdValidator, tokenValidator, validationErrorHandler, getDataFromToken, getUserByToken, checkTokenSession, checkAdmin, getPostById, checkLocked, PostsController.unlock)

router.get(`/`,                 paginationValidator, validationErrorHandler, getPaginationParams, optional(getDataFromToken), optional(getUserByToken), PostsController.getAll)
router.get(`/:id`,              paramIdValidator, validationErrorHandler, optional(getDataFromToken), optional(getUserByToken), getPostById, PostsController.getOne)
router.get(`/:id/comments`,     paramIdValidator, paginationValidator, validationErrorHandler, getPaginationParams, getPostById, PostsController.getComments)

router.delete(`/:id`,           paramIdValidator, tokenValidator, validationErrorHandler, getDataFromToken, getUserByToken, checkTokenSession, getPostById, checkOwner, PostsController.delete)
router.delete(`/:id/like`,      paramIdValidator, tokenValidator, validationErrorHandler, getDataFromToken, getUserByToken, checkTokenSession, getPostById, checkLiked, PostsController.deleteLike)
router.delete(`/:id/dislike`,   paramIdValidator, tokenValidator, validationErrorHandler, getDataFromToken, getUserByToken, checkTokenSession, getPostById, checkDisliked, PostsController.deleteDislike)

export default router
