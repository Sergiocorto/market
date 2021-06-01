const errorHandler = require('../utils/errorHandler')
const Category = require('../models/Category')
const Product = require('../models/Product')

module.exports.getAll = async (req, res) => {
    try {
        const categories = await Category.findAll({raw: true})
        if(req.baseUrl.includes('admin')){
            res.render('admin/category',
                {
                categories,
                isCategories: true,
                title: 'Categories',
                    layout: 'admin'
            })
        }else{
            res.render('categories',
                {
                categories,
                isCategories: true,
                title: 'Categories'
            })
        }
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.getById = function (req, res) {

}

module.exports.create = async function (req, res) {
    const [category, created] = await Category.findOrCreate({
        where: {name: req.body.category}
    })
    if (created){
        res.redirect('/admin/category')
    }else{
        res.status(409).json({massage: 'Такая категория уже существует'})
    }
}

module.exports.remove = async function (req, res) {
    const catId = req.params.id.substr(1)
    try {
        await Category.destroy({where: {id: catId}})
        await Product.destroy({where: {category_id: catId}})
        res.redirect('/admin/category')
    } catch (e) {
        errorHandler(res, e)
    }
}