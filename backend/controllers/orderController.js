const Order = require('../models/Order');

// @desc    Create a new order
// @route   POST /api/orders
// @access  Private
exports.createOrder = async (req, res) => {
    try {
        const {
            orderItems,
            shippingAddress,
            totalPrice,
            // We'll add payment details later
        } = req.body;

        if (orderItems && orderItems.length === 0) {
            return res.status(400).json({ msg: 'No order items' });
        }

        const order = new Order({
            user: req.user.id, // Get the user ID from the authMiddleware
            orderItems,
            shippingAddress,
            totalPrice,
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Get logged-in user's orders
// @route   GET /api/orders/myorders
// @access  Private
exports.getMyOrders = async (req, res) => {
    try {
        // Find all orders that belong to the logged-in user
        const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};