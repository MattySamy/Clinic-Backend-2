import Joi from 'joi';
import { joiPasswordExtendCore } from 'joi-password';
const JoiPassword = Joi.extend(joiPasswordExtendCore);
const registerSchema = Joi.object({
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
    password_confirmation: Joi.any()
        .valid(Joi.ref('password'))
        .required()
        .messages({
            'any.only': 'Password confirmation must match password',
            'any.required': 'Password confirmation is a required field',
        }),
    phoneNumber: Joi.string()
        .regex(/^01[0125][0-9]{8}$/s)
        .required()
        .messages({
            'string.empty': 'Phone number cannot be an empty field',
            'any.required': 'Phone number is a required field',
            'string.pattern.base': 'Phone number must be a valid Egyptian phone number',
        }),
    degree: Joi.string().required().messages({
        'string.empty': 'Degree cannot be an empty field',
        'any.required': 'Degree is a required field',
    }),
    experience: Joi.string().required().messages({
        'string.empty': 'Experience cannot be an empty field',
        'any.required': 'Experience is a required field',
    }),
    skills: Joi.string().required().messages({
        'string.empty': 'Skills cannot be an empty field',
        'any.required': 'Skills is a required field',
    }),
    certifications: Joi.string().required().messages({
        'string.empty': 'Certifications cannot be an empty field',
        'any.required': 'Certifications is a required field',
    }),
    Twitter: Joi.string()
        .uri()
        .regex(/http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/)
        .messages({
            'string.empty': 'Twitter cannot be an empty field',
            'string.uri': 'Twitter must be a valid URL',
            'any.required': 'Twitter is a required field',
        }),
    Facebook: Joi.string()
        .uri()
        .regex(
            /^((?:https?:\/\/|www\.)(?:facebook)(?:.com\/)(?:[-a-z0-9]+\.)*[-a-z0-9]+.*?)$/i,
        )
        .messages({
            'string.empty': 'Facebook cannot be an empty field',
            'string.uri': 'Facebook must be a valid URL',
            'any.required': 'Facebook is a required field',
        }),
    Instagram: Joi.string()
        .uri()
        .regex(
            /(?:(?:http|https):\/\/)?(?:www.)?(?:instagram.com|instagr.am)\/([A-Za-z0-9-_]+)/im,
        )
        .messages({
            'string.empty': 'Instagram cannot be an empty field',
            'string.uri': 'Instagram must be a valid URL',
            'any.required': 'Instagram is a required field',
        }),
    LinkedIn: Joi.string()
        .uri()
        .regex(
            /^http[s]?:\/\/www\.linkedin\.com\/(in|pub|public-profile\/in|public-profile\/pub)\/([\w]{6}-[\w]{1,}-[\w]+)$/,
        )
        .messages({
            'string.empty': 'LinkedIn cannot be an empty field',
            'string.uri': 'LinkedIn must be a valid URL',
            'any.required': 'LinkedIn is a required field',
        }),
    branchId: Joi.number().required().messages({
        'number.base': 'Branch ID must be a number',
        'any.required': 'Branch ID is a required field',
    }),
    image: Joi.string().required().messages({
        'string.empty': 'Image cannot be an empty field',
        'any.required': 'Image is a required field',
    }),
});

export default registerSchema;