const Sequelize = require('sequelize')
const sequelize = new Sequelize ('market', 'root', '', {
    host: 'localhost',
    dialect: "mysql"
})

const Product = sequelize.define ('product', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    category_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    cost: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    image: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

Product.sync()
    .then(r => console.log(r))
    .catch(err => console.log(err))

module.exports = Product