const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const errorCode = err.errorCode || 'INTERNAL_SERVER_ERROR';

  logger.error(`[${req.method}] ${req.url} - ${err.message}`, err);

  res.status(statusCode).json({
    success: false,
    error: {
      code: errorCode,
      message: err.message,
      ...(err.details && { details: err.details }),
      ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
    }
  });
};

module.exports = errorHandler;
