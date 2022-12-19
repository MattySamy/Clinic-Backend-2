import Joi from 'joi';
import { joiPasswordExtendCore } from 'joi-password';
const JoiPassword = Joi.extend(joiPasswordExtendCore);
const registerPatientSchema = Joi.object({
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
    password: JoiPassword.string()
        .min(8)
        .minOfLowercase(1)
        .minOfUppercase(1)
        .minOfNumeric(1)
        .required()
        .messages({
            'string.empty': 'Password cannot be an empty field',
            'password.minOfLowercase': 'Password must contain at least 1 lowercase letter',
            'password.minOfUppercase': 'Password must contain at least 1 uppercase letter',
            'password.minOfNumeric': 'Password must contain at least 1 number',
            'string.min': 'Password must be at least 8 characters long',
            'any.required': 'Password is a required field',
        }),
    password_confirmation: Joi.any().valid(Joi.ref('password')).required().messages({
        'any.only': 'Password confirmation must match password',
        'any.required': 'Password confirmation is a required field',
    }),
    gender: Joi.string().required().valid('male', 'female').messages({
        'string.empty': 'Gender cannot be an empty field',
        'any.only': 'Gender must be one of the following: male or female',
        'any.required': 'Gender is a required field',
    }),
    phoneNumber: Joi.string()
        .regex(/^01[0125][0-9]{8}$/s)
        .required()
        .messages({
            'string.empty': 'Phone number cannot be an empty field',
            'any.required': 'Phone number is a required field',
            'string.pattern.base': 'Phone number must be a valid Egyptian phone number',
        }),
    image: Joi.string().required().messages({
        'string.empty': 'Image cannot be an empty field',
        'any.required': 'Image is a required field',
    }),
});

export default registerPatientSchema;