const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Default error response
  let error = {
    message: err.message || 'Internal Server Error',
    status: err.status || 500,
  };

  // Handle 100ms API errors
  if (err.response && err.response.data) {
    error = {
      message: err.response.data.message || 'External API Error',
      status: err.response.status || 500,
      details: err.response.data
    };
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    error = {
      message: 'Invalid token',
      status: 401
    };
  }

  if (err.name === 'TokenExpiredError') {
    error = {
      message: 'Token expired',
      status: 401
    };
  }

  // Handle validation errors
  if (err.name === 'ValidationError') {
    error = {
      message: 'Validation Error',
      status: 400,
      details: err.errors
    };
  }

  // Don't expose internal errors in production
  if (process.env.NODE_ENV === 'production' && error.status === 500) {
    error.message = 'Internal Server Error';
    delete error.details;
  }

  res.status(error.status).json({
    error: true,
    message: error.message,
    ...(error.details && { details: error.details }),
    timestamp: new Date().toISOString()
  });
};

module.exports = { errorHandler }; 