const orderService = require('../services/order/orderService');

class OrderController {
  async createOrder(req, res) {
    const userId = req.user?.id || null;
    const order = await orderService.createOrder(req.body, userId);
    res.status(201).json({
      success: true,
      data: order,
      message: 'Order created successfully'
    });
  }

  async getOrder(req, res) {
    const order = await orderService.getOrder(req.params.id);
    res.json({
      success: true,
      data: order
    });
  }

  async getUserOrders(req, res) {
    const orders = await orderService.getOrdersByUser(req.user.id);
    res.json({
      success: true,
      data: orders
    });
  }
}

module.exports = new OrderController();
