const model = require('../models/Category')

module.exports.getAll = async (req, res) => {
    const categories = await model.findAll({raw: true})
        .then(console.log('Getting all categories'))
        .catch(err => console.log(err))

    if(req.baseUrl.includes('admin')){
        res.render('admin/category', {categories})
    }else{
        res.render('index', {categories})
    }
}

module.exports.getById = function (req, res) {

}

module.exports.create = async function (req, res) {
    await model.create({
        name: req.body.category
    })
        .then(this.getAll())
        .catch(err => console.log(err))
}

module.exports.update = function (req, res) {

}

module.exports.remove = function (req, res) {

}