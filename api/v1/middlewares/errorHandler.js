// takes error object and returns error message in response

const errorHandler = async (err, req, res, next) => {
  let error = { ...err };
  error.statusCode = 400 || err.status;

  // Cast errors signify that the input was in the wrong format
  if (err.name === 'CastError') {
    error.status = 400;
    error.message = `Invalid value provided for '${err.path}'.`;
  }

  // Validation errors
  if (err.name === 'ValidationError') {
    error.status = 400;
    error.message = Object.values(err.errors)
      .map((obj) => obj.message)
      .join(', ');
  }

  console.log(err);
  res.status(error.statusCode).json({
    success: false,
    message: error.message || err.message,
    data: null,
  });

  next();
};

module.exports = errorHandler;
