const orderRepository = require('../../repository/orderRepository');
const { generateOrderNumber } = require('../../utils/crypto');
const { NotFoundError, BadRequestError } = require('../../utils/errors');

class OrderService {
  async createOrder(orderInput, userId = null) {
    const { items, customer, shippingAddress, subtotal, shippingFee = 0, taxAmount = 0 } = orderInput;

    if (!items || items.length === 0) {
      throw new BadRequestError('Order must contain at least one item');
    }

    const totalAmount = subtotal + shippingFee + taxAmount;
    const orderNumber = generateOrderNumber();

    const orderData = {
      order_number: orderNumber,
      user_id: userId,
      customer_email: customer.email,
      customer_name: customer.fullName || customer.name,
      customer_phone: customer.phone,
      shipping_address: shippingAddress,
      subtotal,
      shipping_fee: shippingFee,
      tax_amount: taxAmount,
      total_amount: totalAmount,
      order_status: 'PENDING',
      payment_status: 'UNPAID'
    };

    return await orderRepository.createOrder(orderData, items);
  }

  async getOrder(orderId) {
    const order = await orderRepository.getById(orderId);
    if (!order) {
      throw new NotFoundError(`Order ${orderId} not found`);
    }
    return order;
  }

  async getOrdersByUser(userId) {
    return await orderRepository.getOrdersByUser(userId);
  }
}

module.exports = new OrderService();
