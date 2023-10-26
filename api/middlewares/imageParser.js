const multer = require(`multer`)
const { v4: uuid } = require(`uuid`)
const fs = require(`fs`)
const path = require(`path`)
const ServerError = require(`../errorHandlers/ServerError`)

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const id = req.fileUuid = uuid()
        const uploadPath  = req.uploadPath = `./uploads/${id.charAt(0)}/${id.charAt(1)}`

        if (!fs.existsSync(uploadPath))
            fs.mkdirSync(uploadPath, { recursive: true })

        cb(null, uploadPath)
    },
    filename: (req, file, cb) => {
        const id = req.fileUuid
        const newFilename = id + path.extname(file.originalname)

        req.filePath = path.join(req.uploadPath, newFilename)

        cb(null, newFilename)
    }
})

const fileFilter = (req, file, cb) => {
    switch (file.mimetype) {
        case 'image/jpeg':
        case `image/png`:
        case `image/webp`:
            cb(null, true)
            break
        default:
            cb(new ServerError(`Unsupported file type. Only jpeg/jpg/png/webp`), false)
    }
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5
    }
})

upload.singleWithHandler = (field) => {
    return (req, res, next) => {
        upload.single(field)(req, res, (err) => {
            if (err)
                next(new ServerError(err.message, 400))
            next()
        })
    }
}

upload.deleteFile = (filePath) => {
    if (filePath !== undefined)
        fs.unlinkSync(filePath)
}

module.exports = upload