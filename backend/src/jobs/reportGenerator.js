const logger = require('../utils/logger');

async function generateDailyReport() {
  logger.info('[Job] Generating daily sales & inventory report...');
}

module.exports = { generateDailyReport };
