
// ================================ User-facing messages ================================

export const ERROR_MESSAGES = {

    NETWORK: {
        REQUEST_TIMEOUT: "Request timed out. Please check your connection and try again.",
        NO_CONNECTION: "Unable to connect. Please check your internet connection.",
        UNEXPECTED: "Something went wrong. Please try again.",
        SERVER_ERROR: "We are experiencing technical difficulties. Please try again later.",
        SERVICE_UNAVAILABLE: "Service is temporarily unavailable. Please try again later.",
    },

    AUTH: {
        LOGIN_FAILED: "Login failed. Please try again.",
        REGISTER_FAILED: "Registration failed. Please try again.",
        INVALID_CREDENTIALS: "Invalid email or password.",
        UNAUTHORIZED: "You are not authorized to perform this action.",
        FORBIDDEN: "Access denied. You do not have permission to perform this action.",
        SESSION_EXPIRED: "Your session has expired. Please login again.",
        TOKEN_EXPIRED: "Your session has expired. Please login again.",
        INVALID_TOKEN: "Invalid session. Please login again.",
        TOO_MANY_REQUESTS: "Too many attempts. Please try again later.",
        FORGOT_PASSWORD_FAILED: "Failed to send reset instructions. Please try again.",
        RESET_PASSWORD_FAILED: "Password reset failed. Please try again.",
        RESET_PASSWORD_EXPIRED: "Password reset link has expired. Please request a new one.",
        INVALID_RESET_TOKEN: "Invalid or expired password reset link. Please request a new one.",
    },

    USER: {
        NOT_FOUND: "No account found with this email.",
        PENDING_NOT_FOUND: "Registration request not found. Please register again.",
        ALREADY_EXISTS: "An account with this email already exists. Please login.",
        INVALID_USER_ID: "Invalid user. Please try again.",
        DELETE_FAILED: "Failed to delete user. Please try again.",
        UPDATE_FAILED: "Failed to update profile. Please try again.",
        FETCH_FAILED: "Failed to load user details. Please try again.",
    },

    OTP: {
        SEND_FAILED: "Failed to send OTP. Please try again.",
        DELIVERY_FAILED: "Failed to deliver OTP to your email. Please try again.",
        INVALID: "Invalid OTP. Please try again.",
        EXPIRED: "OTP has expired. Please request a new one.",
        ALREADY_USED: "This OTP has already been used. Please request a new one.",
        INVALID_PURPOSE: "Invalid OTP request. Please try again.",
        VERIFY_FAILED: "OTP verification failed. Please try again.",
    },

    PROFILE: {
        FETCH_FAILED: "Failed to load profile. Please try again.",
        UPDATE_FAILED: "Failed to update profile. Please try again.",
        CHANGE_PASSWORD_FAILED: "Failed to change password. Please try again.",
        INCORRECT_PASSWORD: "Current password is incorrect.",
        SAME_PASSWORD: "New password must be different from your current password.",
    },

    DASHBOARD: {
        FETCH_FAILED: "Failed to load dashboard. Please try again.",
    },

    VALIDATION: {
        FAILED: "Please check the form for errors and try again.",
    },

};


// ================================ Backend status_code → frontend message map ================================

export const BACKEND_ERROR_MAP = {

    // Client errors
    BAD_REQUEST: ERROR_MESSAGES.NETWORK.UNEXPECTED,
    VALIDATION_FAILED: ERROR_MESSAGES.VALIDATION.FAILED,
    UNAUTHORIZED: ERROR_MESSAGES.AUTH.UNAUTHORIZED,
    FORBIDDEN: ERROR_MESSAGES.AUTH.FORBIDDEN,
    TOO_MANY_REQUESTS: ERROR_MESSAGES.AUTH.TOO_MANY_REQUESTS,

    // Resource errors
    RESOURCE_NOT_FOUND: ERROR_MESSAGES.NETWORK.UNEXPECTED,
    STATIC_IMAGE_NOT_FOUND: ERROR_MESSAGES.NETWORK.UNEXPECTED,
    STATIC_HTML_NOT_FOUND: ERROR_MESSAGES.NETWORK.UNEXPECTED,

    // Token errors
    TOKEN_EXPIRED: ERROR_MESSAGES.AUTH.TOKEN_EXPIRED,
    INVALID_TOKEN: ERROR_MESSAGES.AUTH.INVALID_TOKEN,
    INVALID_PASSWORD_RESET_TOKEN: ERROR_MESSAGES.AUTH.INVALID_RESET_TOKEN,
    TOKEN_GENERATION_FAILED: ERROR_MESSAGES.NETWORK.SERVER_ERROR,

    // User errors
    USER_NOT_FOUND: ERROR_MESSAGES.USER.NOT_FOUND,
    PENDING_USER_NOT_FOUND: ERROR_MESSAGES.USER.PENDING_NOT_FOUND,
    USER_ALREADY_EXISTS: ERROR_MESSAGES.USER.ALREADY_EXISTS,
    INVALID_CREDENTIALS: ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS,
    INVALID_USER_ID: ERROR_MESSAGES.USER.INVALID_USER_ID,
    USER_DELETION_FAILED: ERROR_MESSAGES.USER.DELETE_FAILED,

    // OTP errors
    INVALID_OTP: ERROR_MESSAGES.OTP.INVALID,
    OTP_EXPIRED: ERROR_MESSAGES.OTP.EXPIRED,
    OTP_ALREADY_USED: ERROR_MESSAGES.OTP.ALREADY_USED,
    UNSUPORTED_OTP_PURPOSE: ERROR_MESSAGES.OTP.INVALID_PURPOSE,
    OTP_DELIVERY_FAILED: ERROR_MESSAGES.OTP.DELIVERY_FAILED,

    // Server errors
    INTERNAL_SERVER_ERROR: ERROR_MESSAGES.NETWORK.SERVER_ERROR,
    SERVICE_UNAVAILABLE: ERROR_MESSAGES.NETWORK.SERVICE_UNAVAILABLE,
    SMTP_SERVICE_UNAVAILABLE: ERROR_MESSAGES.OTP.DELIVERY_FAILED,

    // API key errors — user should never see these in normal flow. Shown only as generic error to avoid exposing API key mechanisms
    API_KEY_MISSING: ERROR_MESSAGES.NETWORK.UNEXPECTED,
    API_KEY_INVALID: ERROR_MESSAGES.NETWORK.UNEXPECTED,

    // Configuration errors — never expose config details to user
    CONFIGURATION_ERROR: ERROR_MESSAGES.NETWORK.SERVER_ERROR,

    // DB errors — never expose DB details to user
    DB_PING_FAILED: ERROR_MESSAGES.NETWORK.SERVER_ERROR,
};