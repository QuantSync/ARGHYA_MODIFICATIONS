const jwt = require('jsonwebtoken');
const { UnauthorizedError, ForbiddenError } = require('../utils/errors');
const env = require('../config/env');
const supabase = require('../config/database');

/**
 * Authenticate JWT token or Supabase session
 */
const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedError('Missing or malformed Authorization header');
    }

    const token = authHeader.split(' ')[1];

    // Verify JWT locally or via Supabase
    try {
      const decoded = jwt.verify(token, env.jwtSecret);
      req.user = decoded;
      return next();
    } catch (err) {
      // Fallback: Verify with Supabase Auth
      const { data: { user }, error } = await supabase.auth.getUser(token);
      if (error || !user) {
        throw new UnauthorizedError('Invalid or expired authentication token');
      }
      req.user = {
        id: user.id,
        email: user.email,
        role: user.user_metadata?.role || 'customer'
      };
      return next();
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Optional authentication middleware (attaches user if present, doesn't throw)
 */
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      try {
        const decoded = jwt.verify(token, env.jwtSecret);
        req.user = decoded;
      } catch (e) {
        const { data: { user } } = await supabase.auth.getUser(token);
        if (user) {
          req.user = { id: user.id, email: user.email, role: user.user_metadata?.role || 'customer' };
        }
      }
    }
  } catch (e) {
    // Ignore error for optional auth
  }
  next();
};

/**
 * Admin Role Guard
 */
const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return next(new ForbiddenError('Admin privileges required for this action'));
  }
  next();
};

module.exports = {
  authenticate,
  optionalAuth,
  requireAdmin
};
