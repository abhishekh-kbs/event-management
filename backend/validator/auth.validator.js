// validators/auth.validator.js
const Joi = require('joi');

const registerSchema = Joi.object({
    username: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    phone_number: Joi.number().min(10).optional().allow(null, ''),
    role: Joi.string().min(1).required()
});


const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    rememberMe: Joi.boolean().required()
});

const updateProfileSchema = Joi.object({
    username: Joi.string().min(3).max(50).optional(),
    phone_number: Joi.number().min(10).optional(),
    country: Joi.string().min(1).required()
    // bio: Joi.string().min(5).required()
    // notifyEmail: Joi.boolean().required(),
    // notifyPush: Joi.boolean().required()
});

const forgotPasswordSchema = Joi.object({
    email: Joi.string().email().required()
});

const verifyOtpSchema = Joi.object({
    email: Joi.string().email().required(),
    otp: Joi.number().min(6).required()
});

const resetPasswordSchema = Joi.object({
    email: Joi.string().email().required(),
    newPassword: Joi.string().min(6).required(),
    confirmPassword: Joi.string().min(6).required(),
});


module.exports = { registerSchema, loginSchema, updateProfileSchema, forgotPasswordSchema, verifyOtpSchema, resetPasswordSchema };