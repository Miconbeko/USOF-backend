import jwt from "jsonwebtoken"
import getOffsetDate from "../../utils/getOffsetDate.js";

export default async function (sequelize, DataTypes) {
    const Op = sequelize.Sequelize.Op

    const Token = await sequelize.define(`Token`, {
        type: {
            type: DataTypes.ENUM(`verify`, `pswReset`, `session`, `delete`),
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