const express = require('express')
const router = express.Router()
const Basket = require('../models/Basket')
const Product = require('../models/Product')

router.post('/add', async (req, res) => {

    const product = await Product.findOne({
        where: {id: req.body.id},
        raw: true
    })
    await Basket.add(product)
    res.redirect('/basket')
})

router.get('/', async (req, res) => {

    const basket = await Basket.fetch()
    res.render('basket', {
        title: Basket,
        basket
    })
})

module.exports = router
