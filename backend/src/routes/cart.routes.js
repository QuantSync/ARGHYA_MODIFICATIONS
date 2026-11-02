const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const asyncHandler = require('../middlewares/asyncHandler');
const { optionalAuth } = require('../middlewares/auth');

router.get('/', optionalAuth, asyncHandler(cartController.getCart.bind(cartController)));
router.post('/sync', optionalAuth, asyncHandler(cartController.syncCart.bind(cartController)));

module.exports = router;
