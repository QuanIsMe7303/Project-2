const Order = require('../models/OrderModel');
const Product = require('../models/ProductModel');

// const createOrder = (newOrder) => {
//     return new Promise(async (resolve, reject) => {
//         const {
//             user,
//             orderItems,
//             paymentMethod,
//             itemsPrice,
//             shippingPrice,
//             totalPrice,
//             fullName,
//             address,
//             city,
//             phone,
//         } = newOrder;
//         try {
//             const promise = orderItems.map(async (order) => {
//                 const productData = await Product.findOneAndUpdate(
//                     {
//                         _id: order.product,
//                         countInStock: { $gte: order.amount },
//                     },
//                     {
//                         $inc: {
//                             countInStock: -order.amount,
//                             numberSold: +order.amount,
//                         },
//                     },
//                     {
//                         new: true,
//                     },
//                 );
//                 console.log('productData', productData);

//                 if (productData) {
//                     const createdOrder = await Order.create({
//                         orderItems,
//                         shippingAddress: {
//                             fullName,
//                             address,
//                             city,
//                             phone,
//                         },
//                         paymentMethod,
//                         itemsPrice,
//                         shippingPrice,
//                         totalPrice,
//                         user: user,
//                     });
//                     if (createdOrder) {
//                         return {
//                             status: 'OK',
//                             message: 'SUCCESS',
//                         };
//                     }
//                 } else {
//                     return {
//                         status: 'OK',
//                         message: 'ERR',
//                         id: order.product,
//                     };
//                 }
//             });

//             const results = await Promise.all(promise);
//             const newData = results && results.filter((item) => item.id);
//             if (newData.length) {
//                 resolve({
//                     status: 'ERR',
//                     message: `Sản phẩm có id ${newData.join(', ')} không đủ hàng`,
//                 });
//             }
//             resolve({
//                 status: 'OK',
//                 message: 'Success',
//             });
//         } catch (e) {
//             reject(e);
//         }
//     });
// };

const createOrder = (newOrder) => {
    return new Promise(async (resolve, reject) => {
        const {
            user,
            orderItems,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            totalPrice,
            fullName,
            address,
            city,
            phone,
        } = newOrder;
        try {
            const promise = orderItems.map(async (order) => {
                const productData = await Product.findOneAndUpdate(
                    {
                        _id: order.product,
                        countInStock: { $gte: order.amount },
                    },
                    {
                        $inc: {
                            countInStock: -order.amount,
                            numberSold: +order.amount,
                        },
                    },
                    {
                        new: true,
                    },
                );
                console.log('productData', productData);

                if (!productData) {
                    return {
                        status: 'ERR',
                        message: 'ERR',
                        id: order.product,
                    };
                }
            });

            const results = await Promise.all(promise);
            const newData = results && results.filter((item) => item && item.id);
            if (newData.length) {
                return resolve({
                    status: 'ERR',
                    message: `Sản phẩm có id ${newData.map((item) => item.id).join(', ')} không đủ hàng`,
                });
            }

            const createdOrder = await Order.create({
                orderItems,
                shippingAddress: {
                    fullName,
                    address,
                    city,
                    phone,
                },
                paymentMethod,
                itemsPrice,
                shippingPrice,
                totalPrice,
                user: user,
            });

            if (createdOrder) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                });
            } else {
                resolve({
                    status: 'ERR',
                    message: 'Không thể tạo đơn hàng',
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

const getDetailOrder = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await Order.find({ user: id });

            if (order === null) {
                resolve({
                    status: 'OK',
                    message: 'Order is not exist',
                });
            }

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: order,
            });
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
};

// const cancelOrder = (id, data) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const promise = data.map(async (order) => {
//                 const productData = await Product.findOneAndUpdate(
//                     {
//                         _id: order.product,
//                         numberSold: { $gte: order.amount },
//                     },
//                     {
//                         $inc: {
//                             countInStock: +order.amount,
//                             numberSold: -order.amount,
//                         },
//                     },
//                     {
//                         new: true,
//                     },
//                 );

//                 if (productData) {
//                     const orderDeleted = await Order.findByIdAndDelete(id);
//                     if (orderDeleted === null) {
//                         resolve({
//                             status: 'ERR',
//                             message: 'Order is not exist',
//                         });
//                     }
//                 } else {
//                     return {
//                         status: 'OK',
//                         message: 'ERR',
//                         id: order.product,
//                     };
//                 }
//             });

//             const results = await Promise.all(promise);
//             const newData = results && results.filter((item) => item);
//             if (newData.length) {
//                 resolve({
//                     status: 'ERR',
//                     message: `Sản phẩm có id ${newData.join(', ')} không tồn tại`,
//                 });
//             }
//             resolve({
//                 status: 'OK',
//                 message: 'Success',
//                 data: newData,
//             });
//         } catch (e) {
//             console.log(e);
//             reject(e);
//         }
//     });
// };

const cancelOrder = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const promise = data.map(async (order) => {
                const productData = await Product.findOneAndUpdate(
                    {
                        _id: order.product,
                        numberSold: { $gte: order.amount },
                    },
                    {
                        $inc: {
                            countInStock: +order.amount,
                            numberSold: -order.amount,
                        },
                    },
                    {
                        new: true,
                    },
                );

                if (!productData) {
                    return {
                        status: 'ERR',
                        message: 'ERR',
                        id: order.product,
                    };
                }
            });

            const results = await Promise.all(promise);
            const newData = results && results.filter((item) => item);

            if (newData.length) {
                return resolve({
                    status: 'ERR',
                    message: `Sản phẩm có id ${newData.map((item) => item.id).join(', ')} không tồn tại`,
                });
            }

            const orderDeleted = await Order.findByIdAndDelete(id);
            if (orderDeleted === null) {
                return resolve({
                    status: 'ERR',
                    message: 'Order is not exist',
                });
            }

            resolve({
                status: 'OK',
                message: 'Success',
                data: newData,
            });
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
};

const getAllOrders = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allOrders = await Order.find();

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: allOrders,
            });
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
};

const updateOrderStatus = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkOrder = await Order.findOne({ _id: id });

            if (checkOrder === null) {
                resolve({
                    status: 'OK',
                    message: 'Order is not exist',
                });
            }

            const updatedOrder = await Order.findByIdAndUpdate(id, data, {
                new: true,
            });

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedOrder,
            });
        } catch (e) {
            reject(e);
        }
    });
};

const deleteManyOrder = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Order.deleteMany({ _id: ids });

            resolve({
                status: 'OK',
                message: 'DELETE ORDERS SUCCESS',
            });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    createOrder,
    getDetailOrder,
    cancelOrder,
    getAllOrders,
    updateOrderStatus,
    deleteManyOrder,
};
