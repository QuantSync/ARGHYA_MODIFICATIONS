module.exports = {
  ORDER_STATUS: {
    PENDING: 'PENDING',
    PROCESSING: 'PROCESSING',
    SHIPPED: 'SHIPPED',
    DELIVERED: 'DELIVERED',
    CANCELLED: 'CANCELLED'
  },
  PAYMENT_STATUS: {
    UNPAID: 'UNPAID',
    PAID: 'PAID',
    FAILED: 'FAILED',
    REFUNDED: 'REFUNDED'
  },
  PAYMENT_GATEWAYS: {
    RAZORPAY: 'razorpay',
    STRIPE: 'stripe',
    CASHFREE: 'cashfree',
    PAYTM: 'paytm'
  },
  CATEGORIES: [
    '925 Pure Silver',
    'Anti Tarnish',
    'Hot Deals',
    'Bracelets',
    'Necklaces',
    'Earrings',
    'Combos'
  ],
  INVENTORY_LOG_REASONS: {
    ORDER_DEDUCTION: 'ORDER_DEDUCTION',
    MANUAL_RESTOCK: 'MANUAL_RESTOCK',
    RETURN: 'RETURN',
    CANCEL_RESTOCK: 'CANCEL_RESTOCK'
  }
};
