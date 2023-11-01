const express = require(`express`)
const cors = require(`cors`)

const logger = require(`./middlewares/logger`)
const userDeletion = require(`./utils/userDeleteSchedule`)

const
    {
        globalErrorHandler,
        routeErrorHandler
    } = require(`./errors/handlers`)

const authRoutes = require(`./routes/auth`)

const app = express()

app.use(cors())
app.use(express.json())
app.use(logger.getFileLogger())
app.use(logger.getConsoleLogger())

app.use(`/api/auth`, authRoutes)

app.use(routeErrorHandler)
app.use(globalErrorHandler)

module.exports = app