// ========================== VALIDATION MESSAGES ==========================

const VALIDATION = {
    REQUIRED: "This field is required.",
    INVALID_EMAIL: "Please enter a valid email address.",
    NAME_MIN: "Name must be at least 4 characters.",
    NAME_MAX: "Name must be at most 50 characters.",
    PASSWORD_MIN: "Password must be at least 8 characters.",
    PASSWORD_UPPERCASE: "Password must contain at least one uppercase letter.",
    PASSWORD_NUMBER: "Password must contain at least one number.",
    PASSWORD_SPECIAL: "Password must contain at least one special character.",
    PASSWORD_MISMATCH: "Passwords do not match.",
    OTP_LENGTH: "OTP must be exactly 6 digits.",
    OTP_DIGITS: "OTP must contain only numbers.",
    INVALID_GENDER: "Please select a valid gender.",
    FORM_INVALID: "Please fix the errors in the form and try again.",
};

// ========================== AUTH MESSAGES ==========================

const AUTH = {
    INVALID_CREDENTIALS: "Invalid email or password.",
    LOGIN_FAILED: "Login failed. Please try again.",
    REGISTER_FAILED: "Registration failed. Please try again.",
    SESSION_EXPIRED: "Your session has expired. Please login again.",
    UNAUTHORIZED: "You are not authorized to perform this action.",
    FORBIDDEN: "Access denied.",
    TOO_MANY_REQUESTS: "Too many attempts. Please try again later.",
};

// ========================== USER MESSAGES ==========================

const USER = {
    NOT_FOUND: "No account found with this email.",
    ALREADY_EXISTS: "An account with this email already exists.",
    INVALID_ID: "Invalid user. Please try again.",
    UPDATE_FAILED: "Failed to update profile. Please try again.",
    DELETE_FAILED: "Failed to delete user. Please try again.",
};

// ========================== OTP MESSAGES ==========================

const OTP = {
    SEND_FAILED: "Failed to send OTP. Please try again.",
    INVALID: "Invalid OTP. Please try again.",
    EXPIRED: "OTP has expired. Please request a new one.",
    ALREADY_USED: "This OTP has already been used.",
    VERIFY_FAILED: "OTP verification failed. Please try again.",
};

// ========================== NETWORK / SYSTEM ==========================

const SYSTEM = {
    TIMEOUT: "Request timed out. Please try again.",
    NO_CONNECTION: "Please check your internet connection.",
    SERVER_ERROR: "Something went wrong on our end. Please try again later.",
    SERVICE_UNAVAILABLE: "Service is temporarily unavailable.",
    UNKNOWN: "Something went wrong. Please try again.",
};

// ========================== EXPORT MAIN OBJECT ==========================

export const ERROR_MESSAGES = {
    VALIDATION,
    AUTH,
    USER,
    OTP,
    SYSTEM,
};

// ========================== BACKEND ERROR MAP ==========================

export const BACKEND_ERROR_MAP = {
    // Auth
    INVALID_CREDENTIALS: AUTH.INVALID_CREDENTIALS,
    UNAUTHORIZED: AUTH.UNAUTHORIZED,
    FORBIDDEN: AUTH.FORBIDDEN,
    TOO_MANY_REQUESTS: AUTH.TOO_MANY_REQUESTS,

    // User
    USER_NOT_FOUND: USER.NOT_FOUND,
    USER_ALREADY_EXISTS: USER.ALREADY_EXISTS,
    INVALID_USER_ID: USER.INVALID_ID,

    // OTP
    INVALID_OTP: OTP.INVALID,
    OTP_EXPIRED: OTP.EXPIRED,
    OTP_ALREADY_USED: OTP.ALREADY_USED,

    // Token
    TOKEN_EXPIRED: AUTH.SESSION_EXPIRED,
    INVALID_TOKEN: AUTH.SESSION_EXPIRED,

    // System
    INTERNAL_SERVER_ERROR: SYSTEM.SERVER_ERROR,
    SERVICE_UNAVAILABLE: SYSTEM.SERVICE_UNAVAILABLE,

    // Fallback
    DEFAULT: SYSTEM.UNKNOWN,
};