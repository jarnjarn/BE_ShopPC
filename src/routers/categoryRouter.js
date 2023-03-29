const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/categoryController.js')
const authMiddleware = require('../middlewares/authMiddleware.js')
const adminMiddleware = require('../middlewares/adminMiddleware.js')

router.get('/', categoryController.getCategories)
router.post('/create', authMiddleware, adminMiddleware, categoryController.createCategory)
router.put('/:id', authMiddleware, adminMiddleware, categoryController.updateCategory)
router.delete('/:id', authMiddleware, adminMiddleware, categoryController.deleteCategory)
module.exports = router
