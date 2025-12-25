// validator/gateValidator.js
import Joi from "joi";

export const gateCreateValidator = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  description: Joi.string().min(3).max(500).required(),
  location: Joi.string().min(2).max(100).required(),
});

export const gateUpdateValidator = Joi.object({
  name: Joi.string().min(2).max(100).optional(),
  description: Joi.string().min(3).max(500).optional(),
  location: Joi.string().min(2).max(100).optional(),
});
