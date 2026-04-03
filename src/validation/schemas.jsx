import * as Yup from 'yup';

// Validation for login form (email, password, optional OTP)
export const loginSchema = Yup.object({
    email: Yup.string()
        .email('Invalid email address')
        .lowercase() //Both .lowercase() and .trim() are transformations in Yup, not validations. Your API call receives the cleaned value
        .trim()
        .required('Email is required'),

    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .matches(/[^A-Za-z0-9]/, 'Password must contain at least one special character')
        .required('Password is required'),

    otp: Yup.string()
        .matches(/^\d{6}$/, 'OTP must be exactly 6 digits'),
});

// Validation for register form (fields + email, password, confirm, optional OTP)
export const registerSchema = Yup.object({
    name: Yup.string()
        .trim()
        .min(4, 'Name must be at least 4 characters')
        .max(50, 'Name must not exceed 50 characters')
        .required('Name is required'),

    gender: Yup.string()
        .oneOf(['male', 'female', 'other'], 'Invalid gender')
        .required('Gender is required'),

    email: Yup.string()
        .email('Invalid email address')
        .lowercase()
        .trim()
        .required('Email is required'),

    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .matches(/[^A-Za-z0-9]/, 'Password must contain at least one special character')
        .required('Password is required'),

    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm your password'),

    otp: Yup.string()
        .matches(/^\d{6}$/, 'OTP must be exactly 6 digits'),
});
