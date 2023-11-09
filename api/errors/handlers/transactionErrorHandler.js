import ServerError from "../ServerError.js";

export default (err, req, res, next) => {
    if (err.original.sqlState === '40001') {    // log this
        console.log(`Deadlock. Retrying...`)
        return err.retry(req, res, next)
    }

    return next(new ServerError(`Database error`, 500))
}