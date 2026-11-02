const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const asyncHandler = require('../middlewares/asyncHandler');
const { optionalAuth } = require('../middlewares/auth');

router.post('/initiate', optionalAuth, asyncHandler(paymentController.initiatePayment.bind(paymentController)));
router.post('/verify/:gateway', asyncHandler(paymentController.verifyPayment.bind(paymentController)));

module.exports = router;
