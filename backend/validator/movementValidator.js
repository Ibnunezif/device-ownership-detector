import Joi from "joi";

export const scanDeviceValidator = Joi.object({
  barcode: Joi.string()
    .trim()
    .required()
    .messages({
      "string.empty": "Barcode is required",
      "any.required": "Barcode is required",
    }),

  gate_id: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      "string.pattern.base": "Invalid gate ID",
      "any.required": "Gate ID is required",
    }),

  scan_method: Joi.string()
    .valid("BARCODE", "CAMERA", "MANUAL")
    .required()
    .messages({
      "any.only": "Scan method must be BARCODE, CAMERA, or MANUAL",
      "any.required": "Scan method is required",
    }),
});
