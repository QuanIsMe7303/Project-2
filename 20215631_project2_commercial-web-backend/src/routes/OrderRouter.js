const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/create', authMiddleware, OrderController.createOrder);
router.get('/get-detail/:id', OrderController.getDetailOrder);

module.exports = router;
