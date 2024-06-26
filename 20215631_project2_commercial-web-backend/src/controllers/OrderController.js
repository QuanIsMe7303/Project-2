const OrderService = require('../services/OrderService');

const createOrder = async (req, res) => {
    try {
        const { paymentMethod, itemsPrice, shippingPrice, totalPrice, fullName, address, city, phone } = req.body;
        if (!itemsPrice || !shippingPrice || !totalPrice || !fullName || !address || !city || !phone) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required',
            });
        }
        const response = await OrderService.createOrder(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};

const getDetailOrder = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'userId is required',
            });
        }
        const response = await OrderService.getDetailOrder(userId);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(404).json({
            message: e,
        });
    }
};

const cancelOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const data = req.body;

        if (!orderId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'orderId is required',
            });
        }
        const response = await OrderService.cancelOrder(orderId, data);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(404).json({
            message: e,
        });
    }
};

module.exports = {
    createOrder,
    getDetailOrder,
    cancelOrder,
};
