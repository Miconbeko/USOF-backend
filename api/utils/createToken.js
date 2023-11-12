import sequelize from "../database/db.js";

const models = sequelize.models;

export default async function createToken(type, redirectUrl, owner, transaction) {
    const token = await models.Token.create({
        type,
        redirectUrl
    }, { transaction })

    await token.setOwner(owner, { transaction })

    return token
}