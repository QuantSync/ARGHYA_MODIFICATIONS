const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const asyncHandler = require('../middlewares/asyncHandler');
const { authenticate } = require('../middlewares/auth');
const { authLimiter } = require('../middlewares/rateLimiter');

router.post('/register', authLimiter, asyncHandler(authController.register.bind(authController)));
router.post('/login', authLimiter, asyncHandler(authController.login.bind(authController)));
router.post('/oauth-sync', asyncHandler(authController.oauthSync.bind(authController)));
router.get('/me', authenticate, asyncHandler(authController.getProfile.bind(authController)));
router.put('/me', authenticate, asyncHandler(authController.updateProfile.bind(authController)));

module.exports = router;
