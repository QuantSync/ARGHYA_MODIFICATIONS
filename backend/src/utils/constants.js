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
    'Saree',
    'Lehenga',
    'Kurti',
    'Anarkali',
    'Fusion Wear',
    'Bridal Wear'
  ],
  INVENTORY_LOG_REASONS: {
    ORDER_DEDUCTION: 'ORDER_DEDUCTION',
    MANUAL_RESTOCK: 'MANUAL_RESTOCK',
    RETURN: 'RETURN',
    CANCEL_RESTOCK: 'CANCEL_RESTOCK'
  }
};
