const model = require('../models/Product')

module.exports.getByCategory = async function (req, res) {
    let catId = req.params.categoryId.substr(1)
    const products = await model.findAll({
        where: {
            category_id: catId
        },
        raw: true
    })

    if(req.baseUrl.includes('admin')){
        res.render('admin/products', {products})
    }else{
        res.render('index', {products})
    }
}

module.exports.getById = function (req, res) {

}

module.exports.create = function (req, res) {

}

module.exports.update = function (req, res) {

}

module.exports.remove = function (req, res) {

}