const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const asyncHandler = require('../middlewares/asyncHandler');
const { authenticate, optionalAuth } = require('../middlewares/auth');

router.post('/', optionalAuth, asyncHandler(orderController.createOrder.bind(orderController)));
router.get('/my-orders', authenticate, asyncHandler(orderController.getUserOrders.bind(orderController)));
router.get('/:id', asyncHandler(orderController.getOrder.bind(orderController)));

module.exports = router;
