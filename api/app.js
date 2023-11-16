import express from "express"
import cors from "cors"
import logger from "./middlewares/logger.js"
import "./utils/recordsDeleteSchedule.js"
import "./utils/dbDumpSchedule.js"

import { globalErrorHandler, routeErrorHandler } from "./errors/handlers.js"

import {authRoutes, postsRoutes, usersRoutes, commentsRoutes, categoriesRoutes} from "./routes/routes.js"
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
app.use(`/api/posts`, postsRoutes)
app.use(`/api/comments`, commentsRoutes)
app.use(`/api/categories`, categoriesRoutes)

app.use(routeErrorHandler)
app.use(globalErrorHandler)

export default app