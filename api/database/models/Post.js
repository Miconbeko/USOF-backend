module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define(`Post`, {
        title:{
            type: DataTypes.STRING(60),
            allowNull: false
        },
        status:{
            type: DataTypes.ENUM(`active`, `inactive`),
            allowNull: false,
            defaultValue: `active`
        },
        content:{
            type: DataTypes.TEXT
        }
    })

    return Post
}