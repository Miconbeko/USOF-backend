const express = require(`express`)
const cors = require(`cors`)
const logger = require(`morgan`)
const fs = require(`fs`)
// const { v4: uuid } = require(`uuid`)

const app = express()

const productRoutes = require(`./api/routes/products`)
const orderRoutes = require(`./api/routes/orders`)

app.use(cors())
app.use(express.json())
app.use(logger('combined', {
    stream: fs.createWriteStream('./logger.log', {flags: 'a'})
}));
app.use(logger(`dev`));

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