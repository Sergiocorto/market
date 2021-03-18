module.exports = () => {
    return ((req, res, next) => {
        console.log(req.cookies.user.isAdmin)
        if (req.cookies.user.isAdmin) next()
        else res.redirect('/')
    })
}