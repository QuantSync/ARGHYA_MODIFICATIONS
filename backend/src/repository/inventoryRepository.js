const supabase = require('../config/database');

class InventoryRepository {
  async getVariant(variantId) {
    const { data, error } = await supabase
      .from('variants')
      .select('*')
      .eq('id', variantId)
      .single();

    if (error) throw error;
    return data;
  }

  async deductStock(variantId, quantity, reason, referenceId) {
    // 1. Fetch current variant stock
    const variant = await this.getVariant(variantId);
    if (variant.quantity_avail < quantity) {
      throw new Error(`Insufficient stock for SKU ${variant.sku}. Available: ${variant.quantity_avail}, Requested: ${quantity}`);
    }

    const newQuantity = variant.quantity_avail - quantity;

    // 2. Update variant stock
    const { data: updatedVariant, error: updateError } = await supabase
      .from('variants')
      .update({ quantity_avail: newQuantity, updated_at: new Date().toISOString() })
      .eq('id', variantId)
      .select()
      .single();

    if (updateError) throw updateError;

    // 3. Create Inventory Audit Log
    await supabase.from('inventory_logs').insert([{
      variant_id: variantId,
      quantity_change: -quantity,
      previous_quantity: variant.quantity_avail,
      new_quantity: newQuantity,
      reason: reason || 'ORDER_DEDUCTION',
      reference_id: referenceId
    }]);

    return updatedVariant;
  }

  async restock(variantId, quantity, reason, referenceId) {
    const variant = await this.getVariant(variantId);
    const newQuantity = variant.quantity_avail + quantity;

    const { data: updatedVariant, error: updateError } = await supabase
      .from('variants')
      .update({ quantity_avail: newQuantity, updated_at: new Date().toISOString() })
      .eq('id', variantId)
      .select()
      .single();

    if (updateError) throw updateError;

    await supabase.from('inventory_logs').insert([{
      variant_id: variantId,
      quantity_change: quantity,
      previous_quantity: variant.quantity_avail,
      new_quantity: newQuantity,
      reason: reason || 'MANUAL_RESTOCK',
      reference_id: referenceId
    }]);

    return updatedVariant;
  }

  async getLogs(limit = 50) {
    const { data, error } = await supabase
      .from('inventory_logs')
      .select('*, variants(sku, size, color, products(name))')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  }
}

module.exports = new InventoryRepository();
