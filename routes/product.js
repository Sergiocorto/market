const express = require('express')
const upload = require('../middleware/upload')
const controller = require('../controllers/product')
const router = express.Router()

router.get('/:categoryId', controller.getByCategory)
router.get('/', controller.getAll)
router.get('/:categoryId/:id', controller.getById)
router.post('/', upload.single('image'), controller.create)
router.post('/delete', controller.remove)

module.exports = router