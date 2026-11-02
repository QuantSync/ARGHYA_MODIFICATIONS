const inventoryRepository = require('../../repository/inventoryRepository');

class InventoryService {
  async restockVariant(variantId, quantity, reason, referenceId) {
    return await inventoryRepository.restock(variantId, quantity, reason, referenceId);
  }

  async getInventoryLogs(limit = 50) {
    return await inventoryRepository.getLogs(limit);
  }
}

module.exports = new InventoryService();
