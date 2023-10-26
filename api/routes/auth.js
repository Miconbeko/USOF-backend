const express = require(`express`)
const sequelize = require(`../database/db`)
const upload = require(`../middlewares/imageUploader`)
const validationErrorHandler = require(`../errorHandlers/validationErrorHandler`)


const models = sequelize.models;
const router = express.Router();

router.post(`/register`, upload.singleWithHandler(`avatar`), (req, res, next) => {
    models.User.create({
        login: req.body.login,
        hashedPassword: req.body.password,
        email: req.body.email,
        avatar: req.filePath
    })
    .then((user) => {
        res.status(200).json({
            message: `registration complete`,
            user: user
        })
    })
    .catch((exception) => {
        upload.deleteFile(req.filePath)
        next(validationErrorHandler(exception))
    })
})

module.exports = router

