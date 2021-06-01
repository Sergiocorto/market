const express = require('express')
const controller = require('../controllers/order')
const router = express.Router()

router.get('/', controller.getAll)
router.get('/basket', controller.getBasket)
router.get('/:userId', controller.getByUser)
router.get('/:id', controller.getById)
router.post('/update', controller.update)
router.post('/addToBasket', controller.addToBasket)
router.post('/', controller.create)

module.exports = router