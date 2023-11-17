import express from "express"
import {
    categoryCreationValidator,
    paginationValidator,
    paramIdValidator, postCategoriesValidator,
    tokenValidator
} from "../../middlewares/validators.js";
import {validationErrorHandler} from "../../errors/handlers.js";
import {getCategoryById, getDataFromToken, getPaginationParams, getUserByToken} from "../../middlewares/getters.js";
import CategoriesController from "../../controllers/CategoriesController.js";
import checkAdmin from "../../middlewares/checkers/checkAdmin.js";
import {checkTokenSession} from "../../middlewares/checkers.js";
import getCategoriesByIds from "../../middlewares/getters/getCategoriesByIds.js";


const router = express.Router()


router.post(`/`,        categoryCreationValidator, tokenValidator, validationErrorHandler, getDataFromToken, getUserByToken, checkTokenSession, checkAdmin, CategoriesController.create)

router.put(`/:id`,      paramIdValidator, categoryCreationValidator, tokenValidator, validationErrorHandler, getDataFromToken, getUserByToken, checkTokenSession, checkAdmin, getCategoryById, CategoriesController.edit)

router.get(`/`,         paginationValidator, validationErrorHandler, getPaginationParams, CategoriesController.getAll)
router.get(`/array`,    postCategoriesValidator, validationErrorHandler, getCategoriesByIds, CategoriesController.getArray)

router.get(`/:id`,      paramIdValidator, validationErrorHandler, getCategoryById, CategoriesController.getOne)

router.delete(`/:id`,   paramIdValidator, tokenValidator, validationErrorHandler, getDataFromToken, getUserByToken, checkTokenSession, checkAdmin, getCategoryById, CategoriesController.delete)


export default router
