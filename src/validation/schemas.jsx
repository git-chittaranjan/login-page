import * as Yup from 'yup';

// Validation for login form (email, password, optional OTP)
export const loginSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password too short').required('Password is required'),
    otp: Yup.string().length(6, 'Enter 6-digit OTP').optional(),
});

// Validation for register form (fields + email, password, confirm, optional OTP)
export const registerSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    gender: Yup.string().oneOf(['male', 'female', 'other'], 'Invalid gender').required('Gender is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password too short').required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required('Confirm your password'),
    otp: Yup.string().length(6, 'Enter 6-digit OTP').optional(),
});
