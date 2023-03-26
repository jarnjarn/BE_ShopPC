const Order = require('../models/orderModel');
const OrderDetail = require('../models/orderDeltailModel');
const Products = require('../models/productModel');
const Users = require('../models/userModel');

const getOrderByIdUser = async (req, res) => {
    const { userId } = req.params;
    try {
        let order = await Order.find({ user: userId })
            .populate('user', 'name email')
            .populate({
                path: 'orderDetail',
                populate: {
                    path: 'Products',
                    select: 'name image',
                },
            })
            .lean(); // thêm phương thức lean() để chuyển đổi đối tượng trả về thành đối tượng Javascript thông thường

        if (!order) {
            return res.status(404).json({ message: 'Order not found!' });
        }

        // Lặp qua từng đối tượng orderDetails để trích xuất thông tin sản phẩm
        order = order.map((order) => ({
            ...order,
            orderDetails: order.orderDetails.map((detail) => ({
                ...detail,
                name: detail.product.name,
                img: detail.product.image,
            })),
        }));

        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to get order!' });
    }
};

const getAllOrders = async (req, res) => {

    try {
        const orders = await Order.find({}).populate('user', 'name email')

        if (!orders) {
            return res.status(404).json({ message: 'Order not found!' });
        }

        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to get order!' });

    }
    
}

const addOrder = async (req, res) => {
    try {
        const { user, items } = req.body;

        const orderItems = items.map(item => ({
            product: item.productId,
            quantity: item.quantity,
            price: item.price,
        }));

        const totalprice = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

        const order = new Order({
            user,
            totalprice,
            orderDetails: [],
        });

        for (const item of orderItems) {
            const orderDetail = new OrderDetail({
                order: order._id,
                product: item.product,
                quantity: item.quantity,
                price: item.price,
            });

            await orderDetail.save();

            order.orderDetails.push(orderDetail._id);
        }

        await order.save();

        res.json({ message: 'Order created successfully!', order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create order!' });
    }
};


const updateOrder = async (req, res) => {
    try {
        const { orderId } = req.params;

        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: 'Order not found!' });
        }

        if (order.status !== 'ordering') {
            return res.status(400).json({ message: 'Order cannot be canceled!' });
        }

       // Cập nhật trạng thái đơn hàng thành 'đã hủy'
        order.status = 'canceled';
        await order.save();

         // Update order detail status to 'canceled'
        await OrderDetail.updateMany(
            { order: order._id },
            { $set: { status: 'canceled' } }
        );

        res.json({ message: 'Order canceled successfully!', order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to cancel order!' });
    }
};
 
module.exports = { getAllOrders, addOrder, updateOrder, getOrderByIdUser };