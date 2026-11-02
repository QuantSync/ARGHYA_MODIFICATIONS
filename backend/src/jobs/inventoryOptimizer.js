const logger = require('../utils/logger');
const supabase = require('../config/database');

async function runInventoryCheck() {
  logger.info('[Job] Running inventory check & stock alert optimization...');
  try {
    const { data: lowStockVariants, error } = await supabase
      .from('variants')
      .select('*, products(name)')
      .lt('quantity_avail', 5);

    if (error) throw error;

    if (lowStockVariants && lowStockVariants.length > 0) {
      logger.warn(`[Inventory Alert] ${lowStockVariants.length} variants below threshold:`, 
        lowStockVariants.map(v => `${v.products?.name} (${v.sku}) - Left: ${v.quantity_avail}`)
      );
    } else {
      logger.info('[Inventory Check] Stock levels optimal.');
    }
  } catch (err) {
    if (err.code === 'PGRST205' || err.message?.includes('schema cache')) {
      logger.info('[Inventory Check] Note: Supabase tables not initialized yet. Execute backend/schema.sql in Supabase SQL Editor.');
    } else {
      logger.error('[Job Error] Inventory check failed', err);
    }
  }
}

module.exports = { runInventoryCheck };
