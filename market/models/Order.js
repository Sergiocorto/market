const {Sequelize, DataTypes} = require('sequelize')
const sequelize = new Sequelize ('market', 'root', '', {
    host: 'localhost',
    dialect: "mysql"
})

const Order = sequelize.define ('order', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    basket: {
        type: DataTypes.JSON,
        allowNull: false
    },
    status: {
        type: Sequelize.TEXT,
        allowNull: false
    }

})

Order.sync()
    .then(r => console.log(r))
    .catch(err => console.log(err))

module.exports = Order