const { validationResult } = require(`express-validator`)
const ServerError = require(`./ServerError`)
const upload = require(`../middlewares/imageUploader`)

module.exports = (req, res, next) => {
    const result = validationResult(req)

    if (!result.isEmpty()) {
        const error = new ServerError('Validation error', 400)

        error.errors = result.errors
        upload.deleteFile(req.filePath)
        next(error)
    }
    next()
}

// module.exports = (exception) => {
//     let res = new ServerError(`Validation error`, 400);
//     let errorsArr
//
//     res.errors = []
//     if (exception.errors !== undefined)
//         errorsArr = exception.errors
//     else
//         errorsArr = [exception]
//
//     for (const err of errorsArr) {
//         let newErr
//
//         if (err instanceof ValidationError) {
//             newErr = err
//         } else {
//             newErr = new ValidationError(err.validatorKey, err.message, null, err.path, err.value, null)
//             switch (newErr.validatorKey) {
//                 case `len`:
//                     newErr.description = `Must be more than ${err.validatorArgs[0]} and less than ${err.validatorArgs[1]} symbols`
//                     newErr.validationArgs = err.validationArgs
//                     break
//                 case `isEmail`:
//                     newErr.description = `Must be an email address`
//                     break
//                 case `not_unique`:
//                     newErr.description = `Already exists`
//                     break
//                 case `psw_dismatch`:
//                     newErr.description = `Passwords don't match`
//                 default:
//                     newErr = new ValidationError("unknown", "Unknown error")
//             }
//         }
//
//
//         res.errors.push(newErr)
//     }
//
//     return res
// }