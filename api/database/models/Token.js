const jwt = require(`jsonwebtoken`)
const { v4: uuid } = require(`uuid`)
const getOffsetDate = require(`../../utils/getOffsetDate`)
const bcrypt = require(`bcrypt`)

module.exports = (sequelize, DataTypes) => {
    const Token = sequelize.define(`Token`, {
        type: {
            type: DataTypes.ENUM('verify', 'pswReset'),
            allowNull: false
        },
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        expiredAt: {
            type: DataTypes.DATE,
            defaultValue: getOffsetDate({ days: 1 })
        },
        redirectUrl: {
            type: DataTypes.STRING
        },
        token: {
            type: DataTypes.VIRTUAL,
            get() {
                return jwt.sign({
                    tokenId: this.id,
                    redirectUrl: this.redirectUrl
                }, process.env.JWT_KEY, {
                    expiresIn: `${this.expiredAt.getTime() - new Date().getTime()}ms`,
                    jwtid: this.uuid
                })
            }
        }
    })

    return Token
}