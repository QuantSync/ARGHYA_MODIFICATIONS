const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  razorpay: {
    keyId: process.env.RAZORPAY_KEY_ID || 'rzp_live_TgZrGbzaYRBa90',
    keySecret: process.env.RAZORPAY_KEY_SECRET || 'DeJDyJqHhV96iP9GVXPnyXaj',
    currency: 'INR'
  },
  stripe: {
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || 'pk_test_mock',
    secretKey: process.env.STRIPE_SECRET_KEY || 'sk_test_mock',
    currency: 'inr'
  },
  paytm: {
    merchantId: process.env.PAYTM_MERCHANT_ID || 'PAYTM_MOCK_MID',
    merchantKey: process.env.PAYTM_MERCHANT_KEY || 'PAYTM_MOCK_KEY',
    environment: process.env.PAYTM_ENVIRONMENT || 'TEST',
    website: 'WEBSTAGING'
  },
  cashfree: {
    appId: process.env.CASHFREE_APP_ID || 'CASHFREE_MOCK_APP_ID',
    secretKey: process.env.CASHFREE_SECRET_KEY || 'CASHFREE_MOCK_SECRET',
    apiVersion: '2022-09-01',
    environment: process.env.CASHFREE_ENV || 'TEST'
  }
};
