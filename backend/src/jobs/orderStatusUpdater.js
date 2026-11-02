const logger = require('../utils/logger');

async function updatePendingOrders() {
  logger.info('[Job] Checking pending orders status...');
}

module.exports = { updatePendingOrders };
