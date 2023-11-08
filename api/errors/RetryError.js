module.exports = (fn, error) => {
    error.retry = fn

    return error
}