const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // limit each IP to 200 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: {
      code: 'TOO_MANY_REQUESTS',
      message: 'Too many requests from this IP, please try again after 15 minutes'
    }
  }
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20, // Strict 20 attempts per 15 minutes for auth routes
  message: {
    success: false,
    error: {
      code: 'TOO_MANY_AUTH_ATTEMPTS',
      message: 'Too many authentication attempts, please try again later'
    }
  }
});

module.exports = {
  apiLimiter,
  authLimiter
};
