const express = require(`express`)
const sequelize = require(`../database/db`)

const router = express.Router();

router.get(`/`, (req, res) => {
    res.status(200).json({
        message: "Get all products"
    })
})

router.post(`/`, async (req, res) => {
    const product = {
        name: req.body.name,
        price: req.body.price
    }

    res.status(201).json({
        message: "Create a product",
        product: product
    })
})

router.patch(`/:productId`, (req, res) => {
    const id = req.params.productId

    res.status(201).json({
        message: "Product was changed",
        id: id
    })
})

router.delete(`/:productId`, (req, res) => {
    const id = req.params.productId

    res.status(201).json({
        message: "Product was deleted",
        id: id
    })
})

module.exports = router