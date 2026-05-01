
import { useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { loginWithCredentials, verifyLoginOtp } from "../services/authService";
import { useAuth } from "../../../contexts/AuthContext";
import APP_ROUTES from "../../../constants/appRoutes";
import { ERROR_MESSAGES } from "../../../constants/errorMessages";

const STEP = Object.freeze({
    CREDENTIALS: "CREDENTIALS",
    OTP: "OTP",
});


/* A React Hook is simply a function that: 
 * Can use other hooks (useState, useEffect, etc.)
 * Returns data / functions / objects
 * Does NOT return JSX (not a component)
*/
export function useLogin() {

    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();

    const [step, setStep] = useState(STEP.CREDENTIALS);
    const [email, setEmail] = useState(""); // carried from step 1 → step 2
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null); // { message, traceId }


    // Where to send the user after successful login
    const from = location.state?.from?.pathname ?? APP_ROUTES.PRIVATE.DASHBOARD;

    // Toast message injected by ProtectedRoute when session expired
    const sessionMessage = location.state?.message ?? null;


    const clearError = useCallback(() => setError(null), []);

    const setApiError = (err) => {
        setError({
            message: err?.message || ERROR_MESSAGES.SYSTEM.UNKNOWN,
            traceId: err?.traceId || null,
        });
    };



    const submitCredentials = useCallback(async (values) => {

        setIsLoading(true);
        clearError();

        try {
            await loginWithCredentials(values.email, values.password);

            setEmail(values.email);
            setStep(STEP.OTP);

        } catch (err) {
            setApiError(err);

        } finally {
            setIsLoading(false);
        }
    }, [clearError]);



    const submitOtp = useCallback(async (values) => {

        setIsLoading(true);
        clearError();

        try {
            const response = await verifyLoginOtp(email, values.otp_code);

            login(response.data);
            navigate(from, { replace: true });

        } catch (err) {
            setApiError(err);

        } finally {
            setIsLoading(false);
        }
    },
        [clearError, email, login, navigate, from]
    );



    const goBackToCredentials = useCallback(() => {
        setStep(STEP.CREDENTIALS);
        clearError();
    }, [clearError]);



    return {
        step,
        STEP,
        email,
        isLoading,
        error,
        clearError,
        submitCredentials,
        submitOtp,
        goBackToCredentials,
        sessionMessage
    };
}