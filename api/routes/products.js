const express = require(`express`)

const router = express.Router();

router.get(`/`, (req, res) => {
    res.status(200).json({
        message: "Hadling GET request in /products"
    })
})

router.post(`/`, (req, res) => {
    res.status(201).json({
        message: "Hadling POST request in /products"
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