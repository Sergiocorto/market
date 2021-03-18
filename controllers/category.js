const model = require('../models/Category')

module.exports.getAll = async (req, res) => {
    const categories = await model.findAll({raw: true})

    if(req.baseUrl.includes('admin')){
        res.render('admin/category', {categories})
    }else{
        res.render('index', {categories})
    }
}

module.exports.getById = function (req, res) {

}

module.exports.create = async function (req, res) {
    const [category, created] = await model.findOrCreate({
        where: {name: req.body.category}
    })
    if (created){
        res.status(200).redirect('/admin/category')
    }else{
        res.status(409).json({massage: 'Такая категория уже существует'})
    }
}

module.exports.update = function (req, res) {

}

module.exports.remove = function (req, res) {

}