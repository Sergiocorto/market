const express = require('express')
const controller = require('../controllers/category')
const router = express.Router()

router.get('/', controller.getAll)
router.get('/:id', controller.getById)
router.post('/', controller.create)
router.post('/delete/:id', controller.remove)

module.exports = router