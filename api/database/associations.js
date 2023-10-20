module.exports = (sequelize) => {
    const models = sequelize.models

    models.User.hasMany(models.Comment, {
        foreignKey: `user`
    })
    models.Comment.belongsTo(models.User, {
        foreignKey: `user`,
        as: `author`
    })

    models.User.hasMany(models.Post, {
        foreignKey: `user`
    })
    models.Post.belongsTo(models.User, {
        foreignKey: `user`,
        as: `author`
    })

    models.Post.belongsToMany(models.Category, {
        through: `PostCategories`
    })
    models.Category.belongsToMany(models.Post, {
        through: `PostCategories`
    })

    models.Mark.belongsTo(models.User, {
        foreignKey: `user`,
        as: `author`
    })
    models.Mark.belongsTo(models.Post, {
        foreignKey: `postKey`,
        as: `post`
    })
    models.Mark.belongsTo(models.Comment, {
        foreignKey: `commentKey`,
        as: `comment`
    })
}