const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const morgan = require('morgan')('dev')
const path = require('path')
const variables = require('./middleware/variables')
const checkIsAdmin = require('./middleware/checkIsAdmin')
const authRouter = require('./routes/auth')
const orderRouter = require('./routes/order')
const productRouter = require('./routes/product')
const infoRouter = require('./routes/info')
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
app.use(morgan)

const sequelizeSessionStore = new SequelizeStore({
    db: sequelize
})

app.use(session({
    secret: 'secret value',
    resave: false,
    store: sequelizeSessionStore,
    saveUninitialized: false
}))

sequelizeSessionStore.sync()

app.use(variables)
app.use('/admin/analytics', checkIsAdmin(), analyticsRouter)
app.use('/admin/category', checkIsAdmin(), categoryRouter)
app.use('/admin/order', checkIsAdmin(), orderRouter)
app.use('/admin/product', checkIsAdmin(), productRouter)
app.use('/auth', authRouter)
app.use('/product', productRouter)
app.use('/', productRouter)
app.use('/info', infoRouter)
app.use('/order', orderRouter)



const port = process.env.PORT || 3000

app.listen(port, '127.0.0.1', () => console.log(`Server started port ${port}`))