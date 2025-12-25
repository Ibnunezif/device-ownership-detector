import Joi from "joi";

export const deviceTypeCreateValidator = Joi.object({
  name: Joi.string().trim().required(),
  description: Joi.string().allow("").optional(),
});

export const deviceTypeUpdateValidator = Joi.object({
  name: Joi.string().trim().optional(),
  description: Joi.string().allow("").optional(),
}).min(1); // at least one field required for update
