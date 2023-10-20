module.exports = (sequelize, DataTypes) => {
    const Mark = sequelize.define(`Mark`, {
        type:{
            type: DataTypes.ENUM(`like`, `dislike`),
            allowNull: false,
            defaultValue: `like`
        }
    })
}