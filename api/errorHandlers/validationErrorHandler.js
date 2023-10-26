module.exports = (exception) => {
    const errorsArr = exception.errors
    const res = new Error(`Validation error`);

    res.code = 400
    res.errors = []

    for (const err of errorsArr) {
        const newErr = {}

        switch (err.validatorKey) {
            case `len`:
                newErr.message = err.message
                newErr.description = `Must be more than ${err.validatorArgs[0]} and less than ${err.validatorArgs[1]} symbols`
                newErr.field = err.path
                newErr.value = err.value
                newErr.validationArgs = err.validationArgs
                break
            case `isEmail`:
                newErr.message = err.message
                newErr.description = `Must be an email address`
                newErr.field = err.path
                newErr.value = err.value
                break
            case `not_unique`:
                newErr.message = err.message
                newErr.description = `Already exists`
                newErr.field = err.path
                newErr.value = err.value
                break
        }

        res.errors.push(newErr)
    }

    return res
}