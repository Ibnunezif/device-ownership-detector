// utils/responseHandler.js

/**
 * Send a consistent error response.
 * @param {object} res - Express response object.
 * @param {number} status - HTTP status code.
 * @param {string|object} message - Error message or object of validation errors.
 * @param {string} [field='general'] - Field name for the error message.
 */
// utils/responseHandler.js
export const handleError = (res, status = 500, message = null, errors = null) => {
  const response = {
    ok: false,
    status,
    message: message || (errors ? "Validation error" : "An error occurred"),
  };

  if (errors) {
    response.errors = errors;
  }

  return res.status(status).json(response);
};


/**
 * Send a consistent success response.
 * @param {object} res - Express response object.
 * @param {number} status - HTTP status code.
 * @param {string} message - Success message.
 * @param {object} [data={}] - Optional data payload.
 */
export const handleSuccess = (res, status, message, data = {}) => {
  return res.status(status).json({
    ok: true,
    status,
    message,
    data,
  });
};