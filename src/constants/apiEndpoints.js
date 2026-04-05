
const API_ENDPOINTS = Object.freeze({

    AUTH: {
        REGISTER: "/api/auth/register",                     // POST
        LOGIN: "/api/auth/login",                           // POST
        VERIFY_OTP: "/api/auth/verify-otp",                 // POST
        FORGOT_PASSWORD: "/api/auth/forgot-password",       // POST
        RESET_PASSWORD: "/api/auth/reset-password",         // POST
    },

    USERS: {
        GET_ALL_USERS: "/api/users",                        // GET
        GET_USER_BY_ID: (id) => `/api/users/${id}`,         // GET
        CREATE_USER: "/api/users",                          // POST
        UPDATE_USER: (id) => `/api/users/${id}`,            // PUT
        PATCH_USER: (id) => `/api/users/${id}`,             // PATCH
        DELETE_USER: (id) => `/api/users/${id}`,            // DELETE
    }
});

export default API_ENDPOINTS;