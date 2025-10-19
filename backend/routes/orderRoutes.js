const express = require('express');
const router = express.Router();
const { createOrder, getMyOrders } = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');

// Define the routes
// We pass 'authMiddleware' as the second argument to protect the route
router.post('/', authMiddleware, createOrder);
router.get('/myorders', authMiddleware, getMyOrders);

module.exports = router;