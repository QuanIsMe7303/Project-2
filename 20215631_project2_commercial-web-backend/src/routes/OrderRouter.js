const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/create', OrderController.createOrder);
router.get('/get-detail/:id', OrderController.getDetailOrder);
router.delete('/:id', OrderController.cancelOrder);

module.exports = router;
