const express = require('express');
const router = express.Router();
const { getAllOrders,  addOrder, updateOrder, getOrderByIdUser } = require('../controllers/orderController');
const authMiddleware = require('../middlewares/authMiddleware');


router.get('/',authMiddleware, getAllOrders);
router.get('/:userId',authMiddleware, getOrderByIdUser);
router.post('/',authMiddleware, addOrder);
router.put('/:id',authMiddleware, updateOrder);

module.exports = router;
