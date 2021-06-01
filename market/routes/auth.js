const express = require('express')
const controller = require('../controllers/auth')
const router = express.Router()

router.post('/login', controller.login)

router.post('/register', controller.register)

router.get('/logout', controller.logout)

module.exports = router