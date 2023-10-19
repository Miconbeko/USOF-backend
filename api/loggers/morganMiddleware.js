const logger = require(`morgan`)
const fs = require(`fs`)

logger.getFileLogger = () => {
    return logger('combined', {
                stream: fs.createWriteStream('./logs/log.log', {flags: 'a'})
            })
}

logger.getConsoleLogger = () => {
    return logger(`dev`)
}

module.exports = logger