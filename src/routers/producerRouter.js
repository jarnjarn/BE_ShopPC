const express = require('express');
const router = express.Router();
const producerController = require('../controllers/producerController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');


router.get('/', producerController.getAllProducers);
router.post('/create', authMiddleware, adminMiddleware, producerController.createProducer);
router.get('/:id', producerController.getProducer);
router.put('/:id', authMiddleware, adminMiddleware, producerController.updateProducer);
router.delete('/:id', authMiddleware, adminMiddleware, producerController.deleteProducer);

module.exports = router;