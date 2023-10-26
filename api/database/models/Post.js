module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define(`Post`, {
        title: {
            type: DataTypes.STRING(60),
            allowNull: false,
            validate: {
                len: [5, 60],
                notEmpty: true
            }
        },
        status: {
            type: DataTypes.ENUM(`active`, `inactive`),
            allowNull: false,
            defaultValue: `active`
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [10, 65535],
                notEmpty: true
            }
        }
    })

    return Post
}