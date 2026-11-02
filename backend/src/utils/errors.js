class AppError extends Error {
  constructor(message, statusCode = 500, errorCode = 'INTERNAL_SERVER_ERROR') {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super(message, 404, 'NOT_FOUND');
  }
}

class BadRequestError extends AppError {
  constructor(message = 'Bad request') {
    super(message, 400, 'BAD_REQUEST');
  }
}

class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized access') {
    super(message, 401, 'UNAUTHORIZED');
  }
}

class ForbiddenError extends AppError {
  constructor(message = 'Access forbidden') {
    super(message, 403, 'FORBIDDEN');
  }
}

class ValidationError extends AppError {
  constructor(message = 'Validation failed', details = []) {
    super(message, 422, 'VALIDATION_ERROR');
    this.details = details;
  }
}

class PaymentError extends AppError {
  constructor(message = 'Payment processing failed', gateway = 'unknown') {
    super(message, 400, 'PAYMENT_FAILED');
    this.gateway = gateway;
  }
}

module.exports = {
  AppError,
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  ValidationError,
  PaymentError
};
