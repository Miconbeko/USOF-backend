import { validationResult } from "express-validator"
import ServerError from "../ServerError.js";
import upload from "../../middlewares/imageUploader.js";

export default (req, res, next) => {
    const result = validationResult(req)

    if (!result.isEmpty()) {
        const error = new ServerError('Validation error', 400)

        error.errors = result.errors
        upload.deleteFile(req.filePath)
        next(error)
    }
    next()
}