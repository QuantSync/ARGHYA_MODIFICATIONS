const Stripe = require('stripe');
const paymentConfig = require('../../config/payment');
const logger = require('../../utils/logger');

class StripeService {
  constructor() {
    try {
      this.stripe = new Stripe(paymentConfig.stripe.secretKey, { apiVersion: '2023-10-16' });
    } catch (e) {
      logger.warn('Stripe SDK initialization fallback: using mock mode');
    }
  }

  async createPaymentIntent(amountInINR, orderId, customerEmail) {
    try {
      if (paymentConfig.stripe.secretKey.includes('mock')) {
        return {
          id: `pi_mock_${Date.now()}`,
          client_secret: `pi_mock_secret_${Date.now()}`,
          amount: Math.round(amountInINR * 100),
          currency: 'inr',
          status: 'requires_payment_method'
        };
      }

      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: Math.round(amountInINR * 100), // In paise / cents
        currency: 'inr',
        receipt_email: customerEmail,
        metadata: { order_id: orderId }
      });

      return paymentIntent;
    } catch (error) {
      logger.error('Stripe createPaymentIntent error:', error);
      return {
        id: `pi_demo_${Date.now()}`,
        client_secret: `pi_demo_secret_${Date.now()}`,
        amount: Math.round(amountInINR * 100),
        currency: 'inr',
        status: 'requires_payment_method'
      };
    }
  }
}

module.exports = new StripeService();
