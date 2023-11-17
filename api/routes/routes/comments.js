import express from "express"
import {commentCreationValidator, paramIdValidator, tokenValidator} from "../../middlewares/validators.js";
import {getCommentById, getDataFromToken, getPostByComment, getUserByToken} from "../../middlewares/getters.js";
import CommentsController from "../../controllers/CommentsController.js";
import {validationErrorHandler} from "../../errors/handlers.js";
import {checkNotLocked, checkOwner, checkTokenSession} from "../../middlewares/checkers.js";


const router = express.Router()


router.post(`/:id/comment`,  paramIdValidator, commentCreationValidator, tokenValidator, validationErrorHandler, getDataFromToken, getUserByToken, checkTokenSession, getCommentById, getPostByComment, checkNotLocked, CommentsController.create)

router.put(`/:id`,          paramIdValidator, commentCreationValidator, tokenValidator, validationErrorHandler, getDataFromToken, getUserByToken, checkTokenSession, getCommentById, checkOwner, getPostByComment, checkNotLocked, CommentsController.edit)

router.get(`/:id`,          paramIdValidator, validationErrorHandler, getCommentById, CommentsController.getOne)

router.delete(`/:id`,       paramIdValidator, tokenValidator, validationErrorHandler, getDataFromToken, getUserByToken, checkTokenSession, getCommentById, checkOwner, getPostByComment, checkNotLocked, CommentsController.delete)


export default router
