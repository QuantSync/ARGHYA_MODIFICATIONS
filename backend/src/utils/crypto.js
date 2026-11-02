const crypto = require('crypto');

/**
 * Verify Razorpay payment signature
 */
function verifyRazorpaySignature(orderId, paymentId, signature, secret) {
  if (!signature || !secret) return false;
  const body = orderId + '|' + paymentId;
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(body.toString())
    .digest('hex');
  return expectedSignature === signature;
}

/**
 * Generate unique order number (e.g. ARG-20260920-89F2)
 */
function generateOrderNumber() {
  const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const randomHex = crypto.randomBytes(2).toString('hex').toUpperCase();
  return `ARG-${timestamp}-${randomHex}`;
}

module.exports = {
  verifyRazorpaySignature,
  generateOrderNumber
};
