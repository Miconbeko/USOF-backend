const randomstring = require(`randomstring`);

module.exports = (length) => {
    return randomstring.generate({ length, charset: `numeric` })
}