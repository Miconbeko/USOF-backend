const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const modelsDir = path.join(__dirname, `models`)
const db = {}

const config = JSON.parse(fs.readFileSync(`config.json`))
const sequelize = new Sequelize(
    config.database,
    config.user,
    config.password,
    {
        host: config.host,
        dialect: `mysql`
    }
)

fs.readdirSync(modelsDir)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const model = require(path.join(modelsDir, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });
db.sequelize = sequelize;
db.Sequelize = Sequelize;

async function testConnection() {
    sequelize.authenticate().then(() => {
        console.log('Database: Connection has been established successfully');
    }).catch((error) => {
        console.error('Database: Unable to connect to the database: ', error);
    })
}

testConnection()

module.exports = db;