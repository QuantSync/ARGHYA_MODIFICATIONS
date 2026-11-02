const logger = require('../utils/logger');
const paymentService = require('../services/payment/paymentService');

class WebhookController {
  async handleRazorpayWebhook(req, res) {
    logger.info('Received Razorpay Webhook Event', req.body);
    const event = req.body.event;

    if (event === 'payment.captured' || event === 'order.paid') {
      const paymentEntity = req.body.payload.payment.entity;
      await paymentService.verifyPayment('razorpay', {
        razorpay_order_id: paymentEntity.order_id,
        razorpay_payment_id: paymentEntity.id,
        gatewayOrderId: paymentEntity.order_id,
        orderId: paymentEntity.notes?.order_id
      });
    }

    res.json({ status: 'ok' });
  }

  async handleStripeWebhook(req, res) {
    logger.info('Received Stripe Webhook Event', req.body);
    const event = req.body;

    if (event.type === 'payment_intent.succeeded') {
      const intent = event.data.object;
      await paymentService.verifyPayment('stripe', {
        orderId: intent.metadata?.order_id,
        gatewayOrderId: intent.id,
        paymentId: intent.id
      });
    }

    res.json({ received: true });
  }

  async handleCashfreeWebhook(req, res) {
    logger.info('Received Cashfree Webhook Event', req.body);
    const data = req.body.data;

    if (data && data.order && data.order.order_status === 'PAID') {
      await paymentService.verifyPayment('cashfree', {
        orderId: data.order.order_id,
        gatewayOrderId: data.order.order_id,
        paymentId: data.payment.cf_payment_id
      });
    }

    res.json({ status: 'OK' });
  }

  async handlePaytmWebhook(req, res) {
    logger.info('Received Paytm Webhook Event', req.body);
    if (req.body.STATUS === 'TXN_SUCCESS') {
      await paymentService.verifyPayment('paytm', {
        orderId: req.body.ORDERID,
        gatewayOrderId: req.body.ORDERID,
        paymentId: req.body.TXNID
      });
    }

    res.json({ STATUS: 'SUCCESS' });
  }
}

module.exports = new WebhookController();
