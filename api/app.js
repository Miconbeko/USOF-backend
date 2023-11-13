import express from "express"
import cors from "cors"
import logger from "./middlewares/logger.js"
import "./utils/userDeleteSchedule.js"

import { globalErrorHandler, routeErrorHandler } from "./errors/handlers.js"

import authRoutes from "./routes/auth.js"
import usersRoutes from "./routes/users.js"
import rateLimiter from "./middlewares/rateLimiter.js";

const app = express()

app.use(cors())
app.use(express.json())
app.use(logger.getFileLogger())
app.use(logger.getConsoleLogger())

app.use(rateLimiter)
app.use(express.static(`uploads`))
app.use(`/api/auth`, authRoutes)
app.use(`/api/users`, usersRoutes)

app.use(routeErrorHandler)
app.use(globalErrorHandler)

export default app