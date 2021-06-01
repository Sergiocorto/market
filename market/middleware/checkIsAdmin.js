module.exports = () => {
    return ((req, res, next) => {
        if (!req.session.user || !req.session.user.isAdmin) res.redirect('/')
        next()
    })
}