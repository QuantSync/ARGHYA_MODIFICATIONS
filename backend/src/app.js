const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config();

const env = require('./config/env');
const logger = require('./utils/logger');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const { apiLimiter } = require('./middlewares/rateLimiter');
const { runInventoryCheck } = require('./jobs/inventoryOptimizer');

const app = express();

// Security & Middleware
app.use(helmet());
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'https://arghya-modifications.vercel.app', 'https://arghya-collections.vercel.app', 'https://arghya-store.vercel.app', env.frontendUrl],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

if (env.nodeEnv !== 'test') {
  app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'));
}

// Health Check Endpoint (Required by Docker & Railway)
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    service: 'Arghya Modifications Backend API',
    timestamp: new Date().toISOString(),
    environment: env.nodeEnv,
    aws: {
      configured: env.aws.isConfigured,
      region: env.aws.region,
      s3Bucket: env.aws.s3.bucket
    }
  });
});

// API Routes
app.use('/api', apiLimiter, routes);

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: `Route ${req.originalUrl} does not exist`
    }
  });
});

// Global Error Handler
app.use(errorHandler);

// Start Server
if (require.main === module) {
  const PORT = env.port || 3000;
  app.listen(PORT, () => {
    logger.info(`=================================================`);
    logger.info(`🚀 Arghya Modifications API Server running on port ${PORT}`);
    logger.info(`🌍 Environment: ${env.nodeEnv}`);
    logger.info(`🏥 Health Check: http://localhost:${PORT}/health`);
    logger.info(`=================================================`);

    // Run initial inventory check
    runInventoryCheck();
  });
}

module.exports = app;
