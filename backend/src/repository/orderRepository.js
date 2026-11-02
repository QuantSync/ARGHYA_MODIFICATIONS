const supabase = require('../config/database');

class OrderRepository {
  async createOrder(orderData, items) {
    // 1. Insert order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([orderData])
      .select()
      .single();

    if (orderError) throw orderError;

    // 2. Insert order items
    const orderItems = items.map(item => ({
      order_id: order.id,
      product_id: item.product_id,
      variant_id: item.variant_id,
      product_name: item.product_name,
      variant_details: item.variant_details || '',
      quantity: item.quantity,
      price: item.price,
      total_price: item.price * item.quantity
    }));

    const { data: createdItems, error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems)
      .select();

    if (itemsError) throw itemsError;

    return { ...order, items: createdItems };
  }

  async getById(id) {
    const { data, error } = await supabase
      .from('orders')
      .select('*, order_items(*), payments(*)')
      .eq('id', id)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  async getByOrderNumber(orderNumber) {
    const { data, error } = await supabase
      .from('orders')
      .select('*, order_items(*), payments(*)')
      .eq('order_number', orderNumber)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  async updateStatus(id, orderStatus, paymentStatus) {
    const updates = { updated_at: new Date().toISOString() };
    if (orderStatus) updates.order_status = orderStatus;
    if (paymentStatus) updates.payment_status = paymentStatus;

    const { data, error } = await supabase
      .from('orders')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getOrdersByUser(userId) {
    const { data, error } = await supabase
      .from('orders')
      .select('*, order_items(*)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }
}

module.exports = new OrderRepository();
