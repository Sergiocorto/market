const Sequelize = require('sequelize')
const sequelize = new Sequelize('mysql2')

const Image = sequelize.define ('image', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false
    },
    product_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    path: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

module.exports = sequelize.models.Image