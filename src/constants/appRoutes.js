
export const APP_ROUTES = {

    // Public routes — accessible without authentication
    PUBLIC: {
        HOME: "/",
        LOGIN: "/login",
        REGISTER: "/register",
        FORGOT_PASSWORD: "/forgot-password",
        RESET_PASSWORD: "/reset-password",
        UNAUTHORIZED: "/unauthorized",
        NOT_FOUND: "*",
    },


    
    // Authenticated routes — require valid access token
    DASHBOARD: {
        HOME: "/dashboard",
    },
    PROFILE: {
        VIEW: "/profile",
        UPDATE: "/profile/update",
    },
};