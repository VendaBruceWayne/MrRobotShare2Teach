import Joi from "joi";

export const RegisterValidation = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string()
        .min(8)
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])'))
        .required()
        .messages({
            'string.pattern.base': `Password must contain at least 8 characters, including an uppercase letter, a lowercase letter, a number, and a special character.`,
        }),
    password_confirm: Joi.string().valid(Joi.ref('password')).required().messages({
        'any.only': 'Passwords do not match',
    }), 
});
