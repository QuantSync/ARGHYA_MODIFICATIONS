const inventoryService = require('../services/product/inventoryService');
const supabase = require('../config/database');

class AdminController {
  async getDashboardStats(req, res) {
    // Total Revenue, Total Orders, Total Products, Total Customers
    const { data: orders } = await supabase.from('orders').select('total_amount, order_status, payment_status');
    const { count: productCount } = await supabase.from('products').select('*', { count: 'exact', head: true });
    const { count: customerCount } = await supabase.from('users').select('*', { count: 'exact', head: true });

    const totalRevenue = (orders || [])
      .filter(o => o.payment_status === 'PAID')
      .reduce((sum, o) => sum + Number(o.total_amount), 0);

    const totalOrders = orders ? orders.length : 0;

    res.json({
      success: true,
      data: {
        totalRevenue,
        totalOrders,
        totalProducts: productCount || 0,
        totalCustomers: customerCount || 0
      }
    });
  }

  async restockVariant(req, res) {
    const { variantId, quantity, reason } = req.body;
    const result = await inventoryService.restockVariant(variantId, quantity, reason, 'ADMIN_MANUAL');
    res.json({
      success: true,
      data: result,
      message: 'Stock updated successfully'
    });
  }

  async getInventoryLogs(req, res) {
    const logs = await inventoryService.getInventoryLogs(req.query.limit || 50);
    res.json({
      success: true,
      data: logs
    });
  }
}

module.exports = new AdminController();
