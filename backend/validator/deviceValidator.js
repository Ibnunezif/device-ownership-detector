import Joi from "joi";

// MongoDB ObjectId regex
const objectIdRegex = /^[0-9a-fA-F]{24}$/;

// =======================
// CREATE DEVICE VALIDATOR
// =======================
export const createDeviceValidator = Joi.object({
  user_id: Joi.string()
    .pattern(objectIdRegex)
    .required()
    .messages({
      "string.pattern.base": "Invalid user ID",
      "any.required": "User is required",
    }),

  device_type_id: Joi.string()
    .pattern(objectIdRegex)
    .required()
    .messages({
      "string.pattern.base": "Invalid device type",
      "any.required": "Device type is required",
    }),

  brand: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .required()
    .messages({
      "string.empty": "Brand is required",
    }),

  model: Joi.string()
    .trim()
    .min(1)
    .max(50)
    .required()
    .messages({
      "string.empty": "Model is required",
    }),

  serial_number: Joi.string()
    .trim()
    .min(3)
    .max(100)
    .required()
    .messages({
      "string.empty": "Serial number is required",
    }),

  color: Joi.string()
    .trim()
    .max(30)
    .optional(),

  device_photo: Joi.string()
    .uri()
    .optional()
    .messages({
      "string.uri": "Device photo must be a valid URL",
    }),

  status: Joi.string()
    .valid("pending", "approved", "stolen", "blocked")
    .optional(),

  barcode_data: Joi.string()
    .trim()
    .optional(),

  id_generated_by: Joi.string()
    .pattern(objectIdRegex)
    .optional()
    .messages({
      "string.pattern.base": "Invalid generated-by user ID",
    }),
}).options({ abortEarly: false });


export const updateDeviceValidator = Joi.object({
  device_type_id: Joi.string().pattern(objectIdRegex),
  brand: Joi.string().trim().min(2).max(50),
  model: Joi.string().trim().min(1).max(50),
  serial_number: Joi.string().trim().min(3).max(100),
  color: Joi.string().trim().max(30),
  device_photo: Joi.string().uri(),
  status: Joi.string().valid("pending", "approved", "stolen", "blocked"),
  barcode_data: Joi.string().trim(),
  id_generated_by: Joi.string().pattern(objectIdRegex),
}).options({ abortEarly: false }).min(1);
