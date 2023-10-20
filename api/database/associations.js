module.exports = (sequelize) => {
    const models = sequelize.models

    models.User.hasMany(models.Comment)
    models.Comment.belongsTo(models.User, {
        as: `author`
    })

    models.User.hasMany(models.Post)
    models.Post.belongsTo(models.User, {
        as: `author`
    })

    models.Post.belongsToMany(models.Category, {
        through: `PostCategories`
    })
    models.Category.belongsToMany(models.Post, {
        through: `PostCategories`
    })

    models.Mark.belongsTo(models.User, {
        as: `author`
    })
    models.Mark.belongsTo(models.Post, {
        as: `post`
    })
    models.Mark.belongsTo(models.Comment, {
        as: `comment`
    })
}