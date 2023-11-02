module.exports = (sequelize) => {
    const models = sequelize.models

    function commentHasAuthor() {
        models.User.hasMany(models.Comment, {
            foreignKey: `userId`
        })
        models.Comment.belongsTo(models.User, {
            foreignKey: `userId`,
            as: `author`
        })
    }

    function postHasAuthor() {
        models.User.hasMany(models.Post, {
            foreignKey: `userId`
        })
        models.Post.belongsTo(models.User, {
            foreignKey: `userId`,
            as: `author`
        })
    }

    function userHasFavouritePosts() {
        models.Post.belongsToMany(models.User, {
            through: `FavouritePosts`
        })
        models.User.belongsToMany(models.Post, {
            through: `FavouritePosts`
        })
    }

    function postHasCategories() {
        models.Post.belongsToMany(models.Category, {
            through: `PostCategories`
        })
        models.Category.belongsToMany(models.Post, {
            through: `PostCategories`
        })
    }

    function markHasAuthor() {
        models.User.hasMany(models.Mark, {
            foreignKey: `userId`
        })
        models.Mark.belongsTo(models.User, {
            foreignKey: `userId`,
            as: `author`
        })
    }

    function postHasMarks() {
        models.Post.hasMany(models.Mark, {
            foreignKey: `markableId`,
            constraints: false,
            scope:{
                markableType: `post`
            }
        })
        models.Mark.belongsTo(models.Post, {
            foreignKey: 'markableId',
            constraints: false
        })
    }

    function commentHasMarks() {
        models.Comment.hasMany(models.Mark, {
            foreignKey: `markableId`,
            constraints: false,
            scope:{
                markableType: `comment`
            }
        })
        models.Mark.belongsTo(models.Comment, {
            foreignKey: 'markableId',
            constraints: false
        })
    }

    function initMarkPolimorfic() {  // TODO: Test it
        models.Mark.addHook(`afterFind`, (findResult) => {
            if (!Array.isArray(findResult))
                findResult = [findResult]
            for (const instance of findResult) {
                if (instance.markableType === `post` && instance.post !== undefined)
                    instance.markable = instance.post
                if (instance.markableType === `comment` && instance.comment !== undefined)
                    instance.markable = instance.comment

                delete instance.post
                delete instance.dataValues.post
                delete instance.comment
                delete instance.dataValues.comment
            }
        })
    }

    function tokenHasUser() {
        models.User.hasMany(models.Token, {
            foreignKey: `userId`
        })
        models.Token.belongsTo(models.User, {
            foreignKey: `userId`,
            as: `owner`
        })
    }

    commentHasAuthor()
    postHasAuthor()
    userHasFavouritePosts()
    postHasCategories()
    markHasAuthor()
    postHasMarks()
    commentHasMarks()
    initMarkPolimorfic()
    tokenHasUser()
}