
/**
 * BFSI-Grade In-Memory Token Manager
 * - Stores access token ONLY in memory (no localStorage/sessionStorage) to prevent XSS attacks.
 * - Manages token lifecycle by calling the functions: set, get, clear and expiry validation.
 * - Token will be lost on page refresh (by design for security).
 */


let _ACCESS_TOKEN = null;
let _EXPIRES_AT = null;

// 30-second buffer to prevent edge cases where token expires during an API call.
const EXPIRY_BUFFER_MS = 30 * 1000;



export const setAccessToken = (token, expiresAt) => {

    if (!token || typeof token !== "string") {
        throw new Error("[AUTH ERROR] Invalid access token");
    }

    _ACCESS_TOKEN = token;

    if (expiresAt) {
        const parsedDate = new Date(expiresAt);

        if (isNaN(parsedDate.getTime())) {
            throw new Error("[AUTH ERROR] Invalid expiry date");
        }

        _EXPIRES_AT = parsedDate;

    } else {
        _EXPIRES_AT = null;
    }


    // Set the token in cookie -- only for developement
    const expiryDate = expiresAt ? new Date(expiresAt).toUTCString() : "";
    document.cookie = `access_token=${token}; path=/; expires=${expiryDate}; Secure; SameSite=Strict`
};



export const getAccessToken = () => {
    return _ACCESS_TOKEN;
};



export const clearAccessToken = () => {
    _ACCESS_TOKEN = null;
    _EXPIRES_AT = null;
    document.cookie = "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; Secure; SameSite=Strict";
};



export const isTokenExpired = () => {
    if (!_ACCESS_TOKEN || !_EXPIRES_AT)
        return true;

    const now = Date.now();
    const expiryTime = _EXPIRES_AT.getTime();

    return now >= (expiryTime - EXPIRY_BUFFER_MS); // Returns true or false
};



export const getTokenExpiresAt = () => {
    return _EXPIRES_AT;
};