
import * as Yup from 'yup';
import { OTP_PURPOSE } from "../constants/otpPurpose";



// Validation for login form (email, password)
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
        .required('Password is required')
});



// Validation for OTP form
export const otpSchema = Yup.object({
    email: Yup.string()
        .email('Invalid email address')
        .lowercase() //Both .lowercase() and .trim() are transformations in Yup, not validations. Your API call receives the cleaned value
        .trim()
        .required('Email is required'),

    otp_code: Yup.string()
        .required("OTP is required.")
        .matches(/^\d{6}$/, "OTP must be a 6-digit number."),

    otp_purpose: Yup.number()
        .typeError("OTP purpose must be a number.")
        .integer("OTP purpose must be an integer.")
        .oneOf(Object.values(OTP_PURPOSE), "Invalid OTP purpose.")
        .required("OTP purpose is required."),
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
