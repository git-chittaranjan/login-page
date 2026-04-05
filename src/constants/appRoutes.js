
const APP_ROUTES = Object.freeze({

    // Dynamic redirection (Authenticated → /dashboard & Not authenticated → /login)
    ROOT: "/",

    // Public routes
    PUBLIC: {
        LOGIN: "/login",
        REGISTER: "/register",
        FORGOT_PASSWORD: "/forgot-password",
        RESET_PASSWORD: "/reset-password",
        UNAUTHORIZED: "/unauthorized",
    },

    // Protected routes
    PRIVATE: {
        DASHBOARD: "/dashboard",
        PROFILE: "/profile",
        PROFILE_UPDATE: "/profile/update",
    },

    // System routes
    SYSTEM: {
        NOT_FOUND: "*",
    },
});

export default APP_ROUTES;