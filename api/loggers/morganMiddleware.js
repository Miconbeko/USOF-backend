const logger = require(`morgan`)
const fs = require(`fs`)

logger.getFileLogger = () => {
    if (!fs.existsSync(`./logs`))
        fs.mkdirSync(`./logs`);

    return logger('combined', {
                stream: fs.createWriteStream('./logs/log.log', {flags: 'a'})
            })
}

logger.getConsoleLogger = () => {
    return logger(`dev`)
}

module.exports = logger