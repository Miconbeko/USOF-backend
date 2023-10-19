const express = require(`express`)
const cors = require(`cors`)
const logger = require(`./loggers/morganMiddleware`)

const productRoutes = require(`./routes/products`)
const orderRoutes = require(`./routes/orders`)

const app = express()

app.use(cors())
app.use(express.json())
app.use(logger.getFileLogger())
app.use(logger.getConsoleLogger())

app.use('/products', productRoutes)
app.use('/orders', orderRoutes)

app.use((req, res, next) => {
    const error = new Error("Not found")

    error.code = 404
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.code || 500)
    res.json({
        error: {
            message: error.message,
            url: req.url,
            method: req.method
        }
    })
})

module.exports = app