import sequelize from "../database/db.js";

const models = sequelize.models;

export default async function createToken(type, redirectUrl, owner, transaction, expiredAt) {
    const token = await models.Token.create({
        type,
        redirectUrl,
        expiredAt
    }, { transaction })

    await token.setOwner(owner, { transaction })

    return token
}