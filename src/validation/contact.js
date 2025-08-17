import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Name must be a text string',
    'string.empty': 'Name cannot be empty',
    'string.min': 'Name must be at least {#limit} characters long',
    'string.max': 'Name must be at most {#limit} characters long',
    'any.required': 'Name is required',
  }),
  phoneNumber: Joi.string()
    .pattern(/^\+?[0-9]{10,15}$/)
    .required()
    .messages({
      'string.pattern.base':
        'The phone number must be in international format, for example: +380931234567',
      'string.empty': 'The phone field cannot be empty',
      'any.required': 'The phone field is required',
    }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .min(3)
    .max(20)
    .messages({
      'string.base': 'Email must be a text string',
      'string.min': 'Email must be at least {#limit} characters long',
      'string.max': 'Email must be at most {#limit} characters long',
      'string.email': 'Invalid email format',
      'string.empty': 'Email cannot be empty',
    }),
  isFavourite: Joi.boolean().default(false),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .required()
    .default('personal')
    .messages({
      'any.only': 'Contact type must be one of: work, home, personal',
      'string.base': 'Contact type must be a string',
      'string.empty': 'Contact type cannot be empty',
      'any.required': 'Contact type is required',
    }),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(25).messages({
    'string.base': 'Name must be a text string',
    'string.empty': 'Name cannot be empty',
    'string.min': 'Name must be at least {#limit} characters long',
    'string.max': 'Name must be at most {#limit} characters long',
  }),
  phoneNumber: Joi.string()
    .pattern(/^\+?[0-9]{10,15}$/)
    .messages({
      'string.pattern.base':
        'The phone number must be in international format, for example: +380931234567',
      'string.empty': 'The phone field cannot be empty',
    }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .min(3)
    .max(20)
    .messages({
      'string.base': 'Email must be a text string',
      'string.min': 'Email must be at least {#limit} characters long',
      'string.max': 'Email must be at most {#limit} characters long',
      'string.email': 'Invalid email format',
      'string.empty': 'Email cannot be empty',
    }),
  isFavourite: Joi.boolean().default(false),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .default('personal')
    .messages({
      'any.only': 'Contact type must be one of: work, home, personal',
      'string.base': 'Contact type must be a string',
      'string.empty': 'Contact type cannot be empty',
    }),
});
