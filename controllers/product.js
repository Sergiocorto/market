const fs = require('fs')
const Product = require('../models/Product')
const Category = require('../models/Category')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function (req, res) {
    console.log("All")
    try {
        const products = await Product.findAll({
            raw: true
        })
        const categories = await Category.findAll({
            raw: true
        })

        if(req.baseUrl.includes('admin')){
            res.render('admin/products',
                {
                    products,
                    isProducts: true,
                    title: 'Products',
                    layout: 'admin'
                })
        }else{
            res.render('products',
                {
                    products,
                    categories,
                    isProducts: true,
                    title: 'Products'
                })
        }
    } catch (e) {
        console.error(res, e)
    }
}

module.exports.getByCategory = async function (req, res) {
    console.log(req.params.categoryId)
    const catId = req.params.categoryId.substr(1)
    
    try {
        const products = await Product.findAll({
            where: {category_id: catId},
            raw: true
        })
        const categories = await Category.findAll({
            raw: true
        })
        
        if(req.baseUrl.includes('admin')){
            res.render('admin/products',
                {
                    catId,
                    products,
                    isProducts: true,
                    title: 'Products',
                    layout: 'admin'
                })
        }else{
            res.render('products',
                {
                    products,
                    categories,
                    isProducts: true,
                    title: 'Products'
                })
        }
    } catch (e) {
        console.error(res, e)
    }
}

module.exports.getById = async function (req, res) {

    const id = req.params.id.substr(1)
    try {
        const product = await Product.findOne({
            where: {id: id},
            raw: true
        })
        const categories = await Category.findAll({
            raw: true
        })
        res.render('productCard', {
            product,
            categories
        })
    } catch (e) {
        console.error(res, e)
    }
}

module.exports.create = async function (req, res) {

    try {
        const product = await Product.create({
            category_id: req.body.categoryId,
            title: req.body.title,
            description: req.body.description,
            cost: req.body.cost,
            image: req.file.filename
        })

        res.redirect('/admin/product/:' + req.body.categoryId)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.remove = async function (req, res) {

    const product = await Product.findOne({
        where: {id: req.body.id}
    })

    fs.unlink('public/uploads/'+product.image, function (err){
        if (err){
            console.log(err)
        } else {
            Product.destroy({where: {id: req.body.id}})
        }
    })

    res.redirect('/admin/product/:' + product.category_id)
}