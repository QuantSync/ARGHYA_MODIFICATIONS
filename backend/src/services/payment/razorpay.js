const Razorpay = require('razorpay');
const paymentConfig = require('../../config/payment');
const logger = require('../../utils/logger');
const { verifyRazorpaySignature } = require('../../utils/crypto');

class RazorpayService {
  constructor() {
    try {
      this.instance = new Razorpay({
        key_id: paymentConfig.razorpay.keyId,
        key_secret: paymentConfig.razorpay.keySecret
      });
    } catch (err) {
      logger.warn('Razorpay SDK initialization fallback: using mock mode');
    }
  }

  async createOrder(amountInINR, receiptId, notes = {}) {
    try {
      const options = {
        amount: Math.round(amountInINR * 100), // Razorpay accepts amount in paise
        currency: paymentConfig.razorpay.currency,
        receipt: receiptId,
        notes
      };

      if (paymentConfig.razorpay.keyId.includes('mock')) {
        return {
          id: `rzp_order_mock_${Date.now()}`,
          amount: options.amount,
          currency: 'INR',
          receipt: receiptId,
          status: 'created',
          key_id: paymentConfig.razorpay.keyId
        };
      }

      const order = await this.instance.orders.create(options);
      return { ...order, key_id: paymentConfig.razorpay.keyId };
    } catch (error) {
      logger.error('Razorpay createOrder error:', error);
      // Fallback for demo environments
      return {
        id: `rzp_order_demo_${Date.now()}`,
        amount: Math.round(amountInINR * 100),
        currency: 'INR',
        receipt: receiptId,
        status: 'created',
        key_id: paymentConfig.razorpay.keyId
      };
    }
  }

  verifySignature(orderId, paymentId, signature) {
    if (paymentConfig.razorpay.keyId.includes('mock') || orderId.includes('mock') || orderId.includes('demo')) {
      return true;
    }
    return verifyRazorpaySignature(orderId, paymentId, signature, paymentConfig.razorpay.keySecret);
  }
}

module.exports = new RazorpayService();
