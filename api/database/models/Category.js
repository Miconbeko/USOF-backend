module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define(`Category`, {
        title: {
            type: DataTypes.STRING(40),
            primaryKey: true
        },
        description:{
            type: DataTypes.STRING(1000)
        }
    })

    return Category
}