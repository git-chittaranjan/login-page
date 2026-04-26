
const _ENV = Object.freeze({
    API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
    API_KEY: import.meta.env.VITE_API_KEY,
    APP_NAME: import.meta.env.VITE_APP_NAME,
    APP_VERSION: import.meta.env.VITE_APP_VERSION,
    OTP_LENGTH: Number(import.meta.env.VITE_OTP_LENGTH),
    OTP_EXPIRY_SECONDS: Number(import.meta.env.VITE_OTP_EXPIRY_SECONDS),
    MAX_LOGIN_ATTEMPTS: Number(import.meta.env.VITE_MAX_LOGIN_ATTEMPTS),
    REQUEST_TIMEOUT_MS: Number(import.meta.env.VITE_REQUEST_TIMEOUT_MS),
    ACCESS_TOKEN_EXPIRY_MS: Number(import.meta.env.VITE_ACCESS_TOKEN_EXPIRY_MINUTES) * 60 * 1000,
    DEFAULT_PAGE_SIZE: Number(import.meta.env.VITE_DEFAULT_PAGE_SIZE),
    OTP_RESEND_COOLDOWN_SECONDS: Number(import.meta.env.VITE_OTP_RESEND_COOLDOWN_SECONDS),
});



// REQUIRED KEYS (Fail Fast Strategy)
const REQUIRED_KEYS = ["API_BASE_URL", "API_KEY"];

REQUIRED_KEYS.forEach((key) => {
    if (!_ENV[key]) {
        throw new Error(
            `[CONFIG ERROR] Missing required environment variable: ${key}`
        );
    }
});



// NUMERIC VALIDATION (Strict BFSI Validation)
const NUMERIC_KEYS = [
    "OTP_LENGTH",
    "OTP_EXPIRY_SECONDS",
    "MAX_LOGIN_ATTEMPTS",
    "REQUEST_TIMEOUT_MS",
    "ACCESS_TOKEN_EXPIRY_MS",
    "DEFAULT_PAGE_SIZE",
    "OTP_RESEND_COOLDOWN_SECONDS",
];

NUMERIC_KEYS.forEach((key) => {
    const value = _ENV[key];

    if (typeof value !== "number" || Number.isNaN(value) || value <= 0) {
        throw new Error(
            `[CONFIG ERROR] Invalid numeric value for: ${key}`
        );
    }
});



// IMMUTABLE CONFIG (Security Best Practice)
export const CONFIG = Object.freeze(_ENV);