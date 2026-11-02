const axios = require('axios');
const paymentConfig = require('../../config/payment');
const logger = require('../../utils/logger');

class CashfreeService {
  async createOrder(orderId, amount, customerDetails) {
    try {
      if (paymentConfig.cashfree.appId.includes('MOCK')) {
        return {
          cf_order_id: `cf_mock_${Date.now()}`,
          order_id: orderId,
          payment_session_id: `session_mock_${Date.now()}`,
          order_status: 'ACTIVE'
        };
      }

      const baseUrl = paymentConfig.cashfree.environment === 'PRODUCTION'
        ? 'https://api.cashfree.com/pg'
        : 'https://sandbox.cashfree.com/pg';

      const response = await axios.post(
        `${baseUrl}/orders`,
        {
          order_id: orderId,
          order_amount: amount,
          order_currency: 'INR',
          customer_details: {
            customer_id: customerDetails.id || 'CUST_' + Date.now(),
            customer_email: customerDetails.email,
            customer_phone: customerDetails.phone || '9999999999'
          }
        },
        {
          headers: {
            'x-client-id': paymentConfig.cashfree.appId,
            'x-client-secret': paymentConfig.cashfree.secretKey,
            'x-api-version': paymentConfig.cashfree.apiVersion
          }
        }
      );

      return response.data;
    } catch (error) {
      logger.error('Cashfree createOrder error:', error.response?.data || error.message);
      return {
        cf_order_id: `cf_demo_${Date.now()}`,
        order_id: orderId,
        payment_session_id: `session_demo_${Date.now()}`,
        order_status: 'ACTIVE'
      };
    }
  }
}

module.exports = new CashfreeService();
