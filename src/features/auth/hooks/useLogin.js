
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
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
    const { login } = useAuth();

    const [step, setStep] = useState(STEP.CREDENTIALS);
    const [email, setEmail] = useState(""); // carried from step 1 → step 2
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null); // { message, traceId }



    const clearError = useCallback(() => setError(null), []);



    const submitCredentials = useCallback(async (values) => {

        setIsLoading(true);
        setError(null);

        try {
            await loginWithCredentials(values.email, values.password);

            setEmail(values.email);
            setStep(STEP.OTP);

        } catch (err) {
            setError({
                message: err?.description ?? ERROR_MESSAGES.INVALID_CREDENTIALS,
                traceId: err?.trace_id ?? null,
            });

        } finally {
            setIsLoading(false);
        }
    }, []);



    const submitOtp = useCallback(async (values) => {

        setIsLoading(true);
        setError(null);

        try {
            const response = await verifyLoginOtp(email, values.otp_code);

            login(response.data);
            navigate(APP_ROUTES.PRIVATE.DASHBOARD, { replace: true });

        } catch (err) {
            setError({
                message: err?.description ?? ERROR_MESSAGES.INVALID_OTP,
                traceId: err?.trace_id ?? null,
            });

        } finally {
            setIsLoading(false);
        }
    },
        [email, login, navigate]
    );



    const goBackToCredentials = useCallback(() => {
        setStep(STEP.CREDENTIALS);
        setError(null);
    }, []);



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
    };
}