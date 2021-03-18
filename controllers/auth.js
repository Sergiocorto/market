const bcrypt = require('bcryptjs')
const User = require('../models/User')

module.exports.login = async function (req, res) {
    const loginUser = await User.findOne( {where: {email: req.body.email} })

    if (loginUser) {
        const passwordResult = bcrypt.compareSync(req.body.password, loginUser.password)

        if(passwordResult) {
            res.cookie('user', loginUser, {expires: 0}).status(200).redirect('/')
        }else{
            res.status(401).json({massage: 'Неверный пароль'})
        }
    }else{
        res.status(404).json({massage: 'Пользователь с таким email не найден'})
    }
}

module.exports.register = async function (req, res) {
    console.log(req.body)

    const salt = bcrypt.genSaltSync(10)
    const password = req.body.password

    const [user, created] = await User.findOrCreate({
        where: {
            email: req.body.email
        },
        defaults: {
            password: bcrypt.hashSync(password, salt)
        }
    })

    if (created) {
        res.status(201).json(user)
    } else {
        res.status(409).json({massage: 'Такой email уже зарегистрирован'})
    }
}