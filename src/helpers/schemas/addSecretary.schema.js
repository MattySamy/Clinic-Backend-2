import Joi from 'joi';
const addSecretarySchema = Joi.object({
    firstName: Joi.string().min(3).required().messages({
        'string.empty': 'Name cannot be an empty field',
        'string.min': 'Name must be at least 3 characters long',
        'any.required': 'Name is a required field',
    }),
    lastName: Joi.string().min(3).required().messages({
        'string.empty': 'Name cannot be an empty field',
        'string.min': 'Name must be at least 3 characters long',
        'any.required': 'Name is a required field',
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'Email must be a valid email',
        'string.empty': 'Email cannot be an empty field',
        'any.required': 'Email is a required field',
    }),
    phoneNumber: Joi.string()
        .regex(/^01[0125][0-9]{8}$/s)
        .required()
        .messages({
            'string.empty': 'Phone number cannot be an empty field',
            'any.required': 'Phone number is a required field',
            'string.pattern.base': 'Phone number must be a valid Egyptian phone number',
        }),
    branchId: Joi.number().required().messages({
        'number.base': 'Branch ID must be a number',
        'number.empty ': 'Branch ID cannot be an empty field',
        'any.required': 'Branch ID is a required field',
    }),
});
export default addSecretarySchema;