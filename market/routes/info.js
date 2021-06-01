const express = require('express')
const controller = require('../controllers/info')
const router = express.Router()

router.get('/about', controller.about)

router.get('/contacts', controller.contacts)

module.exports = router