import Joi from 'joi';

// ASTU email regex
const astuEmailRegex = /^[a-zA-Z]+\\.[a-zA-Z]+@astu\\.edu\\.et$/;

export const updateUserValidator = Joi.object({
  first_name: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .optional(),

  last_name: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .optional(),

  phone_number: Joi.string()
    .pattern(/^[0-9+]{9,15}$/)
    .optional(),

  university_id: Joi.string()
    .trim()
    .min(3)
    .max(30)
    .optional(),

  department: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .optional(),

  batch: Joi.string()
    .trim()
    .max(20)
    .optional(),

  role: Joi.string()
    .valid(
      "student",
      "staff",
      "admin",
      "security_staff",
      "security_chief"
    )
    .optional(),

  email: Joi.string()
    .lowercase()
    .pattern(astuEmailRegex)
    .messages({
      "string.pattern.base":
        "The email should be a valid university email",
    })
    .optional(),
})
  // 🚫 prevent empty body {}
  .min(1)
  .messages({
    "object.min": "At least one field must be updated",
  });

// ===================
// Registration Validator
// ===================
export const registrationValidator = Joi.object({
  first_name: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .required(),

  last_name: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .required(),

  phone_number: Joi.string()
    .pattern(/^[0-9+]{9,15}$/)
    .required(),

  university_id: Joi.string()
    .trim()
    .min(3)
    .max(30)
    .required(),

  department: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .optional(),

  batch: Joi.string()
    .trim()
    .max(20)
    .optional(),

  role: Joi.string()
    .valid('student', 'staff', 'admin', 'security_staff', 'security_chief')
    .optional(),

  email: Joi.string()
    .lowercase()
    .pattern(astuEmailRegex)
    .required()
    .messages({
      'string.pattern.base': 'The email should be a valid university email',
      'string.empty': 'Email is required'
    }),

  password: Joi.string()
    .min(8)
    .pattern(new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])'))
    .required()
    .messages({
      'string.pattern.base': 'Password must include uppercase, lowercase, number, and special character',
      'string.min': 'Password must be at least 8 characters',
      'string.empty': 'Password is required'
    })
});

// ===================
// Login Validator
// ===================
export const loginValidator = Joi.object({
  email: Joi.string()
    .lowercase()
    .pattern(astuEmailRegex)
    .required()
    .messages({
      'string.pattern.base': 'The email should be a valid university email',
      'string.empty': 'Email is required'
    }),

  password: Joi.string()
    .min(8)
    .pattern(new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])'))
    .required()
    .messages({
      'string.pattern.base': 'Password must include uppercase, lowercase, number, and special character',
      'string.min': 'Password must be at least 8 characters',
      'string.empty': 'Password is required'
    })
});
