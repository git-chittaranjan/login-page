
import * as Yup from 'yup';
import { OTP_PURPOSE } from "../constants/otpPurpose";
import { CONFIG } from "../../../config/env";
import { ERROR_MESSAGES } from "../../../constants/errorMessages";



// Validation for login form (email, password)
export const loginSchema = Yup.object({
    email: Yup.string()
        .email(ERROR_MESSAGES.VALIDATION.INVALID_EMAIL)
        .lowercase() //Both .lowercase() and .trim() are transformations in Yup, not validations. Your API call receives the cleaned value
        .trim()
        .required(ERROR_MESSAGES.VALIDATION.REQUIRED),

    password: Yup.string()
        .min(8, ERROR_MESSAGES.VALIDATION.PASSWORD_MIN)
        .matches(/[A-Z]/, ERROR_MESSAGES.VALIDATION.PASSWORD_UPPERCASE)
        .matches(/[0-9]/, ERROR_MESSAGES.VALIDATION.PASSWORD_NUMBER)
        .matches(/[^A-Za-z0-9]/, ERROR_MESSAGES.VALIDATION.PASSWORD_SPECIAL)
        .required(ERROR_MESSAGES.VALIDATION.REQUIRED)
});



// Validation for OTP form
export const otpSchema = Yup.object({
    // email: Yup.string()
    //     .email(ERROR_MESSAGES.VALIDATION.INVALID_EMAIL)
    //     .lowercase() //Both .lowercase() and .trim() are transformations in Yup, not validations. Your API call receives the cleaned value
    //     .trim()
    //     .required(ERROR_MESSAGES.VALIDATION.REQUIRED_FIELD),

    otp_code: Yup.string()
        .required(ERROR_MESSAGES.VALIDATION.REQUIRED)
        .length(CONFIG.OTP_LENGTH, ERROR_MESSAGES.VALIDATION.OTP_LENGTH),

    // otp_purpose: Yup.number()
    //     .typeError("OTP purpose must be a number.")
    //     .integer("OTP purpose must be an integer.")
    //     .oneOf(Object.values(OTP_PURPOSE), "Invalid OTP purpose.")
    //     .required("OTP purpose is required."),
});



// Validation for register form (fields + email, password, confirm, optional OTP)
export const registerSchema = Yup.object({
    name: Yup.string()
        .trim()
        .min(4, ERROR_MESSAGES.VALIDATION.NAME_MIN)
        .max(50, ERROR_MESSAGES.VALIDATION.NAME_MAX)
        .required(ERROR_MESSAGES.VALIDATION.REQUIRED),

    gender: Yup.number()
        .oneOf([1, 2, 3], ERROR_MESSAGES.VALIDATION.INVALID_GENDER)
        .required(ERROR_MESSAGES.VALIDATION.REQUIRED),

    email: Yup.string()
        .email(ERROR_MESSAGES.VALIDATION.INVALID_EMAIL)
        .lowercase()
        .trim()
        .required(ERROR_MESSAGES.VALIDATION.REQUIRED),

    password: Yup.string()
        .min(8, ERROR_MESSAGES.VALIDATION.PASSWORD_MIN)
        .matches(/[A-Z]/, ERROR_MESSAGES.VALIDATION.PASSWORD_UPPERCASE)
        .matches(/[0-9]/, ERROR_MESSAGES.VALIDATION.PASSWORD_NUMBER)
        .matches(/[^A-Za-z0-9]/, ERROR_MESSAGES.VALIDATION.PASSWORD_SPECIAL)
        .required(ERROR_MESSAGES.VALIDATION.REQUIRED),

    confirm_password: Yup.string()
        .oneOf([Yup.ref('password')], ERROR_MESSAGES.VALIDATION.PASSWORD_MISMATCH)
        .required(ERROR_MESSAGES.VALIDATION.REQUIRED),
});
