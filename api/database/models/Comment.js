export default async function (sequelize, DataTypes) {
    const Comment = await sequelize.define(`Comment`, {
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1, 65535],
                notEmpty: true
            }
        }
    })

    return Comment
}