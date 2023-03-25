const express = require('express');
const router = express.Router();
const { getAllOrders,  addOrder, updateOrder, getOrderByUser } = require('../controllers/orderController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

router.get('/', authMiddleware, getAllOrders);
router.get('/:userId', authMiddleware, getOrderByUser);
router.post('/', authMiddleware, addOrder);
router.put('/:id', authMiddleware, updateOrder);

module.exports = router;
