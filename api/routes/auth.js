const express = require(`express`)
const sequelize = require(`../database/db`)

const models = sequelize.models;
const validationErrorHandler = require(`../errorHandlers/validationErrorHandler`)
const router = express.Router();

router.post(`/register`, (req, res, next) => {
    models.User.create({
        login: req.body.login,
        hashedPassword: req.body.password,
        email: req.body.email
    }).then((user) => {
        res.status(200).json({
            message: `registration complete`,
            user: user
        })
    }).catch((exception) => {
        const err = validationErrorHandler(exception)
        next(err)
    })
})

module.exports = router

