
import httpClient from "../../../services/httpClient";
import API_ENDPOINTS from "../../../constants/apiEndpoints";
import { OTP_PURPOSE } from "../constants/otpPurpose";


/**
 * Step 1 — Submit email + password. 
 * On success, backend sends OTP to the registered email.
 * Returns the full API envelope.
 */
export async function loginWithCredentials(email, password) {
    return httpClient.post(API_ENDPOINTS.AUTH.LOGIN, {
        email,
        password
    });
}

/**
 * Step 2 — Verify OTP to complete login.
 * Returns the full API envelope containing access_token on success.
 */
export async function verifyLoginOtp(email, otp_code) {
    return httpClient.post(API_ENDPOINTS.AUTH.VERIFY_OTP, {
        email,
        otp_code,
        otp_purpose: OTP_PURPOSE.LOGIN,
    });
}



export async function registerDetails(name, gender, email, password, confirm_password) {
    return httpClient.post(API_ENDPOINTS.AUTH.REGISTER, {
        name,
        gender,
        email,
        password,
        confirm_password
    });
}

export async function verifyRegisterOtp(email, otp_code) {
    return httpClient.post(API_ENDPOINTS.AUTH.VERIFY_OTP, {
        email,
        otp_code,
        otp_purpose: OTP_PURPOSE.REGISTER,
    });
}

