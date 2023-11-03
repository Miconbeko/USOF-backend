const jwt = require(`jsonwebtoken`)
const { v4: uuid } = require(`uuid`)
const getOffsetDate = require(`../../utils/getOffsetDate`)

module.exports = (sequelize, DataTypes) => {
    const Op = sequelize.Sequelize.Op

    const Token = sequelize.define(`Token`, {
        type: {
            type: DataTypes.ENUM(`verify`, `pswReset`, `session`),
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
    }, {
        scopes: {
            verifies: {
                where: {
                    type: `verify`
                }
            },
            passwordResets: {
                where: {
                    type: `pswReset`
                }
            },
            sessions: {
                where: {
                    type: `session`
                }
            },
            expired: {
                where: {
                    expiredAt: {
                        [Op.lte]: new Date()
                    }
                }
            }
        }
    })

    return Token
}