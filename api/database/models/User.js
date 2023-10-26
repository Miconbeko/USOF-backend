module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        login: {
            type: DataTypes.STRING(40),
            unique: true,
            allowNull: false,
            validate: {
                len:[5, 40],
                isAlphanumeric: true,
                notEmpty: true,
            }
        },
        hashedPassword: {
            type: DataTypes.STRING,
            allowNull: false,
            // set(psw) {  Hash here
            //
            // }
        },
        fullName: {
            type: DataTypes.STRING,
            defaultValue: "John Doe",
            validate: {
                len: [0, 100]
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
                len: [0, 255]
            }
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: `./resources/avatars/default.jpg`
        },
        rating: {
            type: DataTypes.BIGINT,
            allowNull: false,
            defaultValue: 0
        },
        role: {
            type: DataTypes.ENUM(`admin`, `user`),
            allowNull: false,
            defaultValue: "user"
        }
    })

    return User
}