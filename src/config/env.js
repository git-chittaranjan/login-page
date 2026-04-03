
const _env = {
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
    apiKey: import.meta.env.VITE_API_KEY,
    appName: import.meta.env.VITE_APP_NAME,
    appVersion: import.meta.env.VITE_APP_VERSION,
    otpLength: Number(import.meta.env.VITE_OTP_LENGTH),
    otpExpirySeconds: Number(import.meta.env.VITE_OTP_EXPIRY_SECONDS),
    maxLoginAttempts: Number(import.meta.env.VITE_MAX_LOGIN_ATTEMPTS),
    requestTimeoutMs: Number(import.meta.env.VITE_REQUEST_TIMEOUT_MS),
    accessTokenExpiryMs: Number(import.meta.env.VITE_ACCESS_TOKEN_EXPIRY_MINUTES) * 60 * 1000,
    defaultPageSize: Number(import.meta.env.VITE_DEFAULT_PAGE_SIZE),
};



// Required attributes — app will not start if any of these are missing
const REQUIRED_KEYS = ["apiBaseUrl", "apiKey"];

REQUIRED_KEYS.forEach((key) => {
    if (!_env[key]) {
        throw new Error(
            `[config] Missing required environment variable: ${key}. Check your .env file.`
        );
    }
});



// Numeric attributes — catch misconfigured values early
const NUMERIC_KEYS = [
    "otpLength",
    "otpExpirySeconds",
    "maxLoginAttempts",
    "requestTimeoutMs",
    "accessTokenExpiryMs",
    "defaultPageSize",
];

NUMERIC_KEYS.forEach((key) => {
    if (isNaN(_env[key]) || _env[key] <= 0) {
        throw new Error(
            `[config] Invalid numeric environment variable: ${key}. Check your .env file.`
        );
    }
});



// Freeze will make config as read-only (config.apiBaseUrl = "http://malicious-site.com"; will throw an error)
export const config = Object.freeze(_env); // To use call config.apiBaseUrl