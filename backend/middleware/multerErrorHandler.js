// middlewares/multerErrorHandler.js
import { handleError } from "../utils/responseHandler.js";

export const multerErrorHandler = (err, req, res, next) => {
  if (err?.name === "MulterError") {
    let message = "File upload error";
    const errors = {};

    switch (err.code) {
      case "LIMIT_FILE_SIZE":
        message = "File too large";
        errors.device_photo = "Maximum allowed size is 2 MB.";
        break;
      case "LIMIT_UNEXPECTED_FILE":
        message = "Unexpected file field";
        break;
      default:
        message = err.message;
    }

    return handleError(res, 400, message, Object.keys(errors).length ? errors : null);
  }

  // Pass non-Multer errors to next error handler
  next(err);
};
