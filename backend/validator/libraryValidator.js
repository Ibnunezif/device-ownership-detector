import Joi from "joi";

/* ============================
   CREATE LIBRARY VALIDATOR
============================ */
const libraryCreateValidator = Joi.object({
  name: Joi.string().trim().min(2).required().messages({
    "string.empty": "Library name is required",
    "string.min": "Library name must be at least 2 characters",
  }),

  description: Joi.string().trim().min(5).required().messages({
    "string.empty": "Description is required",
    "string.min": "Description must be at least 5 characters",
  }),

  location: Joi.string().trim().min(2).required().messages({
    "string.empty": "Location is required",
    "string.min": "Location must be at least 2 characters",
  }),
});

/* ============================
   UPDATE LIBRARY VALIDATOR
============================ */
const libraryUpdateValidator = Joi.object({
  name: Joi.string().trim().min(2).messages({
    "string.min": "Library name must be at least 2 characters",
  }),

  description: Joi.string().trim().min(5).messages({
    "string.min": "Description must be at least 5 characters",
  }),

  location: Joi.string().trim().min(2).messages({
    "string.min": "Location must be at least 2 characters",
  }),
})
  .min(1)
  .messages({
    "object.min": "At least one field must be updated",
  });

export { libraryCreateValidator, libraryUpdateValidator };
