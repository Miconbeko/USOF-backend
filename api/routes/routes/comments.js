import express from "express"
import {commentCreationValidator, paramIdValidator, tokenValidator} from "../../middlewares/validators.js";
import {getCommentById, getDataFromToken, getUserByToken} from "../../middlewares/getters.js";
import CommentsController from "../../controllers/CommentsController.js";
import {validationErrorHandler} from "../../errors/handlers.js";
import {checkOwner, checkTokenSession} from "../../middlewares/checkers.js";


const router = express.Router()


router.get(`/:id`,      paramIdValidator, validationErrorHandler, getCommentById, CommentsController.getOne)

router.put(`/:id`,    paramIdValidator, commentCreationValidator, tokenValidator, validationErrorHandler, getDataFromToken, getUserByToken, getCommentById, checkTokenSession, checkOwner, CommentsController.edit)

router.delete(`/:id`,   paramIdValidator, tokenValidator, validationErrorHandler, getDataFromToken, getUserByToken, getCommentById, checkTokenSession, checkOwner, CommentsController.delete)


export default router
