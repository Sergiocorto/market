const express = require('express')
const controller = require('../controllers/info')
const router = express.Router()

router.get('/', controller.contacts)

module.exports = router