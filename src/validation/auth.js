import Joi from 'joi';

export const registerUserSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.empty': 'Name cannot be empty',
    'string.min': 'Name must be at least {#limit} characters long',
    'string.max': 'Name must be at most {#limit} characters long',
    'any.required': 'Name is required',
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .min(3)
    .max(20)
    .required()
    .messages({
      'string.min': 'Email must be at least {#limit} characters long',
      'string.max': 'Email must be at most {#limit} characters long',
      'string.email': 'Invalid email format',
      'string.empty': 'Email cannot be empty',
    }),
  password: Joi.string().min(8).max(30).required().messages({
    'string.empty': 'Password cannot be empty',
    'string.min': 'Email must be at least {#limit} characters long',
    'string.max': 'Email must be at most {#limit} characters long',
  }),
});

export const loginUser = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .min(3)
    .max(20)
    .required()
    .messages({
      'string.min': 'Email must be at least {#limit} characters long',
      'string.max': 'Email must be at most {#limit} characters long',
      'string.email': 'Invalid email format',
      'string.empty': 'Email cannot be empty',
    }),
  password: Joi.string().min(8).max(30).required().messages({
    'string.empty': 'Password cannot be empty',
    'string.min': 'Email must be at least {#limit} characters long',
    'string.max': 'Email must be at most {#limit} characters long',
  }),
});
