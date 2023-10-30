const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')

const modelsDir = path.join(__dirname, `models`)
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DIALECT
    }
)

fs.readdirSync(modelsDir)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const model = require(path.join(modelsDir, file))(sequelize, Sequelize.DataTypes);
    });

sequelize.testConnection = async () => {
    sequelize.authenticate().then(() => {
        console.log('Database: Connection has been established successfully')
    }).catch((error) => {
        console.error('Database: Unable to connect to the database: ', error)
    })
}

sequelize.createTable = async (config) => {
    require(`./associations`)(sequelize)
    await sequelize.sync(config)
}

sequelize.initDatabase = async () => {
    await sequelize.testConnection()
    await sequelize.createTable({ force: true })
}

sequelize.initDatabase()
sequelize.Sequelize = Sequelize

module.exports = sequelize;