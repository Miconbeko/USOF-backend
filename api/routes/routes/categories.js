import express from "express"
import {
    categoryCreationValidator,
    paginationValidator,
    paramIdValidator,
    tokenValidator
} from "../../middlewares/validators.js";
import {validationErrorHandler} from "../../errors/handlers.js";
import {getCategoryById, getDataFromToken, getPaginationParams, getUserByToken} from "../../middlewares/getters.js";
import CategoriesController from "../../controllers/CategoriesController.js";
import checkAdmin from "../../middlewares/checkers/checkAdmin.js";
import {checkTokenSession} from "../../middlewares/checkers.js";


const router = express.Router()

router.get(`/`,         paginationValidator, validationErrorHandler, getPaginationParams, CategoriesController.getAll)
router.get(`/:id`,      paramIdValidator, validationErrorHandler, getCategoryById, CategoriesController.getOne)
router.post(`/`,        categoryCreationValidator, tokenValidator, validationErrorHandler, getDataFromToken, getUserByToken, checkTokenSession, checkAdmin, CategoriesController.create)
router.patch(`/:id`,    paramIdValidator, categoryCreationValidator, tokenValidator, validationErrorHandler, getDataFromToken, getUserByToken, getCategoryById, checkTokenSession, checkAdmin, CategoriesController.edit)
router.delete(`/:id`,   paramIdValidator, tokenValidator, validationErrorHandler, getDataFromToken, getUserByToken, getCategoryById, checkTokenSession, checkAdmin, CategoriesController.delete)

export default router
