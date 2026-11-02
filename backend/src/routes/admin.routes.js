const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const asyncHandler = require('../middlewares/asyncHandler');
const { authenticate, requireAdmin } = require('../middlewares/auth');

router.get('/stats', authenticate, requireAdmin, asyncHandler(adminController.getDashboardStats.bind(adminController)));
router.post('/restock', authenticate, requireAdmin, asyncHandler(adminController.restockVariant.bind(adminController)));
router.get('/inventory-logs', authenticate, requireAdmin, asyncHandler(adminController.getInventoryLogs.bind(adminController)));

module.exports = router;
