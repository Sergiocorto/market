const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')('dev')
const path = require('path')
const Sequelize = require('sequelize')
const cookieParser = require('cookie-parser')
const checkIsAdmin = require('./config/middleware/checkIsAdmin')

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
app.use(cookieParser())

app.use(express.static(path.join(__dirname, 'public')))
app.use(morgan)
app.use('/auth', authRouter)
app.use('/' || '/category', categoryRouter)
app.use('/order', orderRouter)
app.use('/product', productRouter)
app.use('/about', aboutRouter)
app.use('/contacts', contactsRouter)
app.use('/admin/analytics', checkIsAdmin(), analyticsRouter)
app.use('/admin/category', checkIsAdmin(), categoryRouter)
app.use('/admin/order', checkIsAdmin(), orderRouter)
app.use('/admin/product', checkIsAdmin(), productRouter)

module.exports = app