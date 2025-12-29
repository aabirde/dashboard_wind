class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
  }
}

const ErrorHandler = (error, req, res, next) => {
  let appError;
  if (req.headers.origin) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Credentials', 'true');
  }
if (error.name === 'SequelizeConnectionError') {
    appError = new AppError('Database connection failed', 500);
  } else if (error.name === 'SequelizeValidationError') {
    const message = error.errors.map(err => err.message).join(', ');
    appError = new AppError(message, 400);
  } else if (error.message === 'Not allowed by CORS') {
    appError = new AppError('Not allowed by CORS', 403);
  } else {
    appError = new AppError(
      error.message || 'Internal Server Error', 
      error.statusCode || 500
    );
  }
  
  res.status(appError.statusCode).json({
    status: appError.status,
    message: appError.message,
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
};

module.exports = { AppError, ErrorHandler };
