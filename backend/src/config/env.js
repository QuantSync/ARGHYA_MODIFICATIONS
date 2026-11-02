const dotenv = require('dotenv');
dotenv.config();
const aws = require('./aws');

module.exports = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'arghya_modifications_jwt_secret_key_2026',
  jwtExpiry: process.env.JWT_EXPIRY || '7d',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3001',
  backendUrl: process.env.BACKEND_URL || 'http://localhost:3000',
  aws
};
