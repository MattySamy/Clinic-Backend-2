import Joi from 'joi';
const addBranchSchema = Joi.object({
    name: Joi.string().min(4).required().messages({
        'string.empty': 'Name cannot be an empty field',
        'string.min': 'Name must be at least 4 characters long',
        'any.required': 'Name is a required field',
    }),
    address: Joi.string().min(5).required().messages({
        'string.empty': 'Address cannot be an empty field',
        'string.min': 'Address must be at least 5 characters long',
        'any.required': 'Address is a required field',
    }),
    phoneNumber: Joi.string()
        .regex(/^01[0125][0-9]{8}$/s)
        .required()
        .messages({
            'string.empty': 'Phone number cannot be an empty field',
            'any.required': 'Phone number is a required field',
            'string.pattern.base': 'Phone number must be a valid Egyptian phone number',
        }),
    email: Joi.string().email().required().messages({
        'string.email': 'Email must be a valid email',
        'string.empty': 'Email cannot be an empty field',
        'any.required': 'Email is a required field',
    }),
    image: Joi.string().required().messages({
        'string.empty': 'Image cannot be an empty field',
        'any.required': 'Image is a required field',
    }),
});
export default addBranchSchema;