module.exports.about = function (req, res){
    res.render('about', {
        title: 'About',
        isAbout: true
    })
}

module.exports.contacts = function (req, res){
    res.render('contacts', {
        title: 'Contacts',
        isContacts: true
    })
}