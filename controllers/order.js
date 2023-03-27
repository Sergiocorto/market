const Order = require('../models/Order')
const Product = require('../models/Product')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function (req, res) {
    try{
        const orders = await Order.findAll({
            raw: true
        })
        
        orders.forEach((order)=>{
            order.basket = JSON.parse(order.basket)
        })

        res.render('admin/orders', {
            orders,
            isOrders: true,
            title: 'Orders',
            layout: 'admin'
        })

    } catch (e) {
        console.error(res, e)
    }
}

module.exports.getByUser = async function (req, res) {

    const userId = req.params.userId.substr(1)
    try {
        const orders = await Order.findAll({
            where: {userId},
            raw: true
        })

        orders.forEach((order)=>{
            order.basket = JSON.parse(order.basket)
        })

        res.render('orders', {
                orders,
                isOrders: true,
                title: 'Orders'
            })

    } catch (e) {
        console.error(res, e)
    }
}

module.exports.getById = function (req, res) {

}

module.exports.create = async function (req, res) {
    const basket = req.session.basket

    try{
        const order = await Order.create({
            userId: req.session.user.id,
            basket,
            status: 'new'
        })

        delete req.session.countInBasket
        delete req.session.basket

        res.redirect('/order/:'+req.session.user.id)
    }catch (e) {
        errorHandler(res, e)
    }
}

module.exports.update = async function (req, res) {
    try{
        await Order.update(
            {status: req.body.status},
            {where: {id: req.body.id}}
        )

        res.redirect('/admin/order')
    }catch(e){
        errorHandler(res, e)
    }
}

module.exports.addToBasket = async function (req,res) {
    console.log(req.body)
    const position = await Product.findOne({
        where: {id: req.body.id},
        raw: true
    })

    position.count = req.body.count
    position.totalCost = req.body.count * position.cost

    req.session.countInBasket = req.session.countInBasket || 0
    req.session.countInBasket += +position.count

    if (!req.session.basket){
        const basket = []
        basket.push(position)
        req.session.basket = basket

    }else{

        let check = false
        req.session.basket.forEach(basketPosition => {

            if(basketPosition.id === position.id) {
                basketPosition.count++
                basketPosition.totalCost += basketPosition.cost
                check = true
            }
        })
        if (!check){
            req.session.basket.push(position)
        }
    }

    req.session.save(err => {
        if (err) {
            throw err
        }
        res.redirect('/product/:'+position.category_id)
    })
}

module.exports.getBasket = function (req, res) {
    const positions = req.session.basket
    const user = req.session.user

    res.render('basket', {
        positions,
        user,
        title: 'Basket'
    })
}