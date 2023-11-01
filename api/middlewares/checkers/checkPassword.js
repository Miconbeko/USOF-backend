const ServerError = require(`../../errors/ServerError`)
const bcrypt = require(`bcrypt`)

module.exports = (req, res, next) => {
    if (!bcrypt.compareSync(req.body.password, req.user.password))
        next(new ServerError(`Invalid login or password`, 401))
    next()
}