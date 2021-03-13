const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const Sequelize = require('sequelize')
const mysql = require('mysql2')

const authRouter = require('./routes/auth')
const orderRouter = require('./routes/order')
const productRouter = require('./routes/product')
const aboutRouter = require('./routes/about')
const contactsRouter = require('./routes/contacts')
const analyticsRouter = require('./routes/analytics')
const categoryRouter = require('./routes/category')


const handlebars = require('express-handlebars')

const app = express()
const hbs = handlebars.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

const sequelize = new Sequelize ('market', 'root', '', {
    host: 'localhost',
    dialect: "mysql"
})

sequelize.authenticate()
    .then(result=>{console.log("Database auth")})
    .catch(err=> console.log(err))

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use('/auth', authRouter)
app.use('/' || '/category', categoryRouter)
app.use('/order', orderRouter)
app.use('/product', productRouter)
app.use('/about', aboutRouter)
app.use('/contacts', contactsRouter)
app.use('/admin/analytics', analyticsRouter)
app.use('/admin/category', categoryRouter)
app.use('/admin/order', orderRouter)
app.use('/admin/product', productRouter)

module.exports = app