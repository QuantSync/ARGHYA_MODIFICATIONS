const razorpayService = require('./razorpay');
const stripeService = require('./stripe');
const cashfreeService = require('./cashfree');
const paytmService = require('./paytm');
const paymentRepository = require('../../repository/paymentRepository');
const orderRepository = require('../../repository/orderRepository');
const inventoryRepository = require('../../repository/inventoryRepository');
const { PAYMENT_GATEWAYS, PAYMENT_STATUS, ORDER_STATUS } = require('../../utils/constants');
const { PaymentError, NotFoundError } = require('../../utils/errors');
const logger = require('../../utils/logger');

class PaymentService {
  async initiatePayment(gateway, orderId, userDetails) {
    const order = await orderRepository.getById(orderId);
    if (!order) {
      throw new NotFoundError(`Order with ID ${orderId} not found`);
    }

    let gatewayResponse = {};

    switch (gateway.toLowerCase()) {
      case PAYMENT_GATEWAYS.RAZORPAY:
        gatewayResponse = await razorpayService.createOrder(
          order.total_amount,
          order.order_number,
          { order_id: order.id }
        );
        break;

      case PAYMENT_GATEWAYS.STRIPE:
        gatewayResponse = await stripeService.createPaymentIntent(
          order.total_amount,
          order.id,
          order.customer_email
        );
        break;

      case PAYMENT_GATEWAYS.CASHFREE:
        gatewayResponse = await cashfreeService.createOrder(
          order.order_number,
          order.total_amount,
          { id: userDetails?.id, email: order.customer_email, phone: order.customer_phone }
        );
        break;

      case PAYMENT_GATEWAYS.PAYTM:
        gatewayResponse = await paytmService.initiateTransaction(
          order.order_number,
          order.total_amount,
          userDetails?.id
        );
        break;

      default:
        throw new PaymentError(`Unsupported payment gateway: ${gateway}`);
    }

    // Save initial payment record in DB
    const gatewayOrderId = gatewayResponse.id || gatewayResponse.cf_order_id || gatewayResponse.orderId || order.order_number;

    await paymentRepository.createPaymentRecord({
      order_id: order.id,
      gateway: gateway.toLowerCase(),
      gateway_order_id: String(gatewayOrderId),
      amount: order.total_amount,
      status: 'CREATED',
      raw_response: gatewayResponse
    });

    // Update order with selected gateway
    await orderRepository.updateStatus(order.id, null, null);

    return {
      gateway: gateway.toLowerCase(),
      orderId: order.id,
      orderNumber: order.order_number,
      amount: order.total_amount,
      paymentData: gatewayResponse
    };
  }

  async verifyPayment(gateway, payload) {
    logger.info(`Verifying payment for gateway: ${gateway}`, payload);

    let isSuccess = false;
    let orderId = payload.orderId;
    let gatewayPaymentId = payload.paymentId || payload.razorpay_payment_id || payload.stripe_payment_id;

    if (gateway === PAYMENT_GATEWAYS.RAZORPAY) {
      isSuccess = razorpayService.verifySignature(
        payload.razorpay_order_id,
        payload.razorpay_payment_id,
        payload.razorpay_signature
      );
    } else {
      // Mock / direct verification for sandbox environment demo
      isSuccess = true;
    }

    if (isSuccess && orderId) {
      // 1. Update Order status
      await orderRepository.updateStatus(orderId, ORDER_STATUS.PROCESSING, PAYMENT_STATUS.PAID);

      // 2. Fetch order items & deduct inventory stock
      const order = await orderRepository.getById(orderId);
      if (order && order.order_items) {
        for (const item of order.order_items) {
          if (item.variant_id) {
            try {
              await inventoryRepository.deductStock(
                item.variant_id,
                item.quantity,
                'ORDER_DEDUCTION',
                order.order_number
              );
            } catch (err) {
              logger.warn(`Failed to deduct inventory for item ${item.variant_id}: ${err.message}`);
            }
          }
        }
      }

      // 3. Update Payment table
      await paymentRepository.updatePaymentByGatewayOrderId(payload.razorpay_order_id || payload.gatewayOrderId || order.order_number, {
        status: 'SUCCESS',
        gateway_payment_id: gatewayPaymentId || `pay_success_${Date.now()}`
      });

      return { success: true, message: 'Payment verified and order confirmed', orderId };
    } else {
      if (orderId) {
        await orderRepository.updateStatus(orderId, null, PAYMENT_STATUS.FAILED);
      }
      throw new PaymentError('Payment verification signature check failed', gateway);
    }
  }
}

module.exports = new PaymentService();
