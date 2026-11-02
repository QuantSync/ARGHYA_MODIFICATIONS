const express = require('express');
const router = express.Router();
const webhookController = require('../controllers/webhookController');
const asyncHandler = require('../middlewares/asyncHandler');

router.post('/razorpay', asyncHandler(webhookController.handleRazorpayWebhook.bind(webhookController)));
router.post('/stripe', asyncHandler(webhookController.handleStripeWebhook.bind(webhookController)));
router.post('/cashfree', asyncHandler(webhookController.handleCashfreeWebhook.bind(webhookController)));
router.post('/paytm', asyncHandler(webhookController.handlePaytmWebhook.bind(webhookController)));

module.exports = router;
