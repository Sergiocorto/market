module.exports = function (req, res, next) {
    res.locals.isAuth = req.session.isAuthenticate
    res.locals.inBasket = req.session.countInBasket

    if (req.session.user) {
        res.locals.userId = req.session.user.id
        res.locals.isAdmin = req.session.user.isAdmin
    }
    next()
}