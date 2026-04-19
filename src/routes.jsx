
import { Routes, Route, Navigate } from "react-router-dom";
import APP_ROUTES from "./constants/appRoutes";
import ProtectedRoute from './components/ProtectedRoute';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import Dashboard from './features/dashboard/Dashboard';
import Contact from './features/contact-email/contact';


export default function AppRoutes() {
    return (
        <Routes>
            {/* Public routes */}
            <Route path={APP_ROUTES.PUBLIC.LOGIN} element={<Login />} />
            <Route path={APP_ROUTES.PUBLIC.REGISTER} element={<Register />} />
            <Route path={APP_ROUTES.PRIVATE.DASHBOARD} element={<Dashboard name="Chittaranjan Saha" />} />
            <Route path={APP_ROUTES.PRIVATE.CONTACT} element={<Contact />} />
            {/* <Route path={APP_ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} /> */}

            {/* Fallback */}
            <Route path="*" element={<Navigate to={APP_ROUTES.LOGIN} replace />} />

            {/* Protected routes */}
            {/* <Route element={<ProtectedRoute />}>
                <Route path={APP_ROUTES.DASHBOARD} element={<Dashboard />} />
            </Route> */}
        </Routes>
    );
}