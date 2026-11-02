const paymentConfig = require('../../config/payment');
const logger = require('../../utils/logger');

class PaytmService {
  async initiateTransaction(orderId, amount, customerId) {
    try {
      const paytmParams = {
        body: {
          requestType: 'Payment',
          mid: paymentConfig.paytm.merchantId,
          websiteName: paymentConfig.paytm.website,
          orderId: orderId,
          callbackUrl: `${process.env.BACKEND_URL || 'http://localhost:3000'}/api/webhooks/paytm`,
          txnAmount: {
            value: amount.toFixed(2),
            currency: 'INR'
          },
          userInfo: {
            custId: customerId || 'CUST_MOCK'
          }
        }
      };

      return {
        txnToken: `paytm_token_mock_${Date.now()}`,
        orderId: orderId,
        mid: paymentConfig.paytm.merchantId,
        amount: amount
      };
    } catch (error) {
      logger.error('Paytm initiateTransaction error:', error);
      return {
        txnToken: `paytm_token_demo_${Date.now()}`,
        orderId: orderId,
        mid: paymentConfig.paytm.merchantId,
        amount: amount
      };
    }
  }
}

module.exports = new PaytmService();
