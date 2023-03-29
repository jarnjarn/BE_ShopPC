const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware.js');
const adminMiddleware = require('../middlewares/adminMiddleware.js');
const productController = require('../controllers/productController.js');
const uploadImage = require('../middlewares/uploadMiddleware.js');

router.get('/', productController.getALLProducts);
router.get('/:id', productController.getProductById);
router.post('/', authMiddleware, adminMiddleware,uploadImage, productController.createProduct);
router.put('/:id', authMiddleware, adminMiddleware, productController.updateProduct);
router.delete('/:id', authMiddleware, adminMiddleware, productController.deleteProduct);


module.exports = router;