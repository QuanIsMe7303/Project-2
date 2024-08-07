const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/create', OrderController.createOrder);
router.get('/get-detail/:id', OrderController.getDetailOrder);
router.delete('/:id', OrderController.cancelOrder);
router.get('/getAll', authMiddleware, OrderController.getAllOrders);
router.put('/:id', authMiddleware, OrderController.updateOrderStatus);
router.post('/delete-many', authMiddleware, OrderController.deleteManyOrder);
router.get('/revenue', authMiddleware, OrderController.getRevenue);

module.exports = router;
