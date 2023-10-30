const globalErrorHandler = require(`./handlers/globalErrorHandler`)
const routeErrorHandler = require(`./handlers/routeErrorHandler`)
const validationErrorHandler = require(`./handlers/validationErrorHandler`)

module.exports = {
    globalErrorHandler,
    routeErrorHandler,
    validationErrorHandler
}