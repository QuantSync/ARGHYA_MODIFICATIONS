const supabase = require('../config/database');

class PaymentRepository {
  async createPaymentRecord(paymentData) {
    const { data, error } = await supabase
      .from('payments')
      .insert([paymentData])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updatePaymentByGatewayOrderId(gatewayOrderId, updates) {
    const { data, error } = await supabase
      .from('payments')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('gateway_order_id', gatewayOrderId)
      .select();

    if (error) throw error;
    return data;
  }

  async getByOrderId(orderId) {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('order_id', orderId);

    if (error) throw error;
    return data || [];
  }
}

module.exports = new PaymentRepository();
