import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import APP_ROUTES from "../constants/appRoutes";

export default function ProtectedRoute({ children }) {

    const { isAuthenticated, checkAuth, isLoggingOut } = useAuth();
    const location = useLocation();



    // User clicked Logout button manually 
    if (isLoggingOut) {
        return null;
    }



    // Not logged in at all
    if (!isAuthenticated) {
        return (
            <Navigate
                to={APP_ROUTES.PUBLIC.LOGIN}
                state={{ from: location, message: "You must be logged in to access this page." }}
                replace
            />
        );
    }



    // Logged in but token has expired (or within 30s buffer)
    if (!checkAuth()) {
        return (
            <Navigate
                to={APP_ROUTES.PUBLIC.LOGIN}
                state={{ from: location, message: "Your session has expired. Please log in again." }}
                replace
            />
        );
    }

    return children;
}