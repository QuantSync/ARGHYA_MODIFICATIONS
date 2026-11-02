const paymentService = require('../services/payment/paymentService');

class PaymentController {
  async initiatePayment(req, res) {
    const { gateway, orderId } = req.body;
    const userDetails = req.user || null;

    const paymentResponse = await paymentService.initiatePayment(gateway, orderId, userDetails);
    res.json({
      success: true,
      data: paymentResponse,
      message: `Payment initiated via ${gateway}`
    });
  }

  async verifyPayment(req, res) {
    const { gateway } = req.params;
    const verificationResult = await paymentService.verifyPayment(gateway, req.body);
    res.json({
      success: true,
      data: verificationResult
    });
  }
}

module.exports = new PaymentController();
