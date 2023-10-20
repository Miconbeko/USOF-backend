module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        login:{
            type: DataTypes.STRING(40),
            primaryKey: true,
            validate: {
                len:[5, 40]
            }
        },
        hashedPassword:{
            type: DataTypes.STRING,
            allowNull: false,
            // set(psw) {  Hash here
            //
            // }
        },
        fullName:{
            type: DataTypes.STRING,
            defaultValue: "John Doe"
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        avatar:{
            type: DataTypes.STRING,
            defaultValue: `./resources/avatars/default.jpg`
        },
        rating:{
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        role:{
            type: DataTypes.ENUM(`admin`, `user`),
            defaultValue: "user"
        }
    })

    return User
}