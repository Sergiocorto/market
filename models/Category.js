const Sequelize = require('sequelize')
const sequelize = new Sequelize ('market', 'root', '', {
    host: 'localhost',
    dialect: "mysql"
})

const Category = sequelize.define ('category', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

Category.sync()
    .then(r => console.log(r))
    .catch(err => console.log(err))

module.exports = Category