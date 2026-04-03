
export const ERROR_MESSAGES = {

    // Network & request errors
    NETWORK: {
        REQUEST_TIMEOUT: "Request timed out. Please check your connection and try again.",
        NO_CONNECTION: "Unable to connect. Please check your internet connection.",
        UNEXPECTED: "Something went wrong. Please try again.",
        SERVER_ERROR: "Server error. Please try again later.",
    },

    // Auth errors — maps to AUTH endpoints
    AUTH: {
        INVALID_CREDENTIALS: "Invalid email or password.",
        ACCOUNT_LOCKED: "Your account has been locked. Please contact support.",
        ACCOUNT_INACTIVE: "Your account is inactive. Please contact support.",
        OTP_INVALID: "Invalid OTP. Please try again.",
        OTP_EXPIRED: "OTP has expired. Please request a new one.",
        OTP_MAX_ATTEMPTS: "Maximum OTP attempts exceeded. Please login again.",
        SESSION_EXPIRED: "Your session has expired. Please login again.",
        UNAUTHORIZED: "You are not authorized to perform this action.",
        LOGIN_FAILED: "Login failed. Please try again.",
        REGISTER_FAILED: "Registration failed. Please try again.",
        FORGOT_PASSWORD_FAILED: "Failed to send reset instructions. Please try again.",
        RESET_PASSWORD_FAILED: "Password reset failed. Please try again.",
        RESET_PASSWORD_EXPIRED: "Password reset link has expired. Please request a new one.",
    },

    // Profile errors — maps to PROFILE routes
    PROFILE: {
        FETCH_FAILED: "Failed to load profile. Please try again.",
        UPDATE_FAILED: "Failed to update profile. Please try again.",
        CHANGE_PASSWORD_FAILED: "Failed to change password. Please try again.",
        INCORRECT_PASSWORD: "Current password is incorrect.",
        SAME_PASSWORD: "New password must be different from current password.",
    },

    // Dashboard errors
    DASHBOARD: {
        FETCH_FAILED: "Failed to load dashboard data. Please try again.",
    },
};


export const BACKEND_ERROR_MAP = {

    // Auth
    USER_ALREADY_EXISTS: ERROR_MESSAGES.AUTH.USER_ALREADY_EXISTS,
    USER_NOT_FOUND: ERROR_MESSAGES.AUTH.USER_NOT_FOUND,
    INVALID_CREDENTIALS: ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS,
    ACCOUNT_LOCKED: ERROR_MESSAGES.AUTH.ACCOUNT_LOCKED,
    ACCOUNT_INACTIVE: ERROR_MESSAGES.AUTH.ACCOUNT_INACTIVE,
    OTP_INVALID: ERROR_MESSAGES.AUTH.OTP_INVALID,
    OTP_EXPIRED: ERROR_MESSAGES.AUTH.OTP_EXPIRED,
    OTP_MAX_ATTEMPTS: ERROR_MESSAGES.AUTH.OTP_MAX_ATTEMPTS,
    RESET_PASSWORD_EXPIRED: ERROR_MESSAGES.AUTH.RESET_PASSWORD_EXPIRED,

    // Profile
    INCORRECT_PASSWORD: ERROR_MESSAGES.PROFILE.INCORRECT_PASSWORD,
    SAME_PASSWORD: ERROR_MESSAGES.PROFILE.SAME_PASSWORD,
};