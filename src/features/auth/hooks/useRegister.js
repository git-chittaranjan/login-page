import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { registerDetails, verifyRegisterOtp } from "../services/authService";
import APP_ROUTES from "../../../constants/appRoutes";
import { ERROR_MESSAGES } from "../../../constants/errorMessages";


/*
 * Manages the two-step registration flow:
 *   1. REGISTER_FORM → user fills details → server sends OTP to their email
 *   2. OTP  → user verifies 6-digit code → account created → redirect to login
 */
const STEP = Object.freeze({
    FORM: "REGISTER_FORM",
    OTP: "OTP",
});



export function useRegister() {

    const navigate = useNavigate();

    const [step, setStep] = useState(STEP.FORM);
    const [email, setEmail] = useState(""); // carried from step 1 → step 2
    const [isLoading, setIsLoading] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const [error, setError] = useState(null); // { message, traceId } | null



    const clearError = useCallback(() => setError(null), []);

    const setApiError = (err) => {
        setError({
            message: err?.message || ERROR_MESSAGES.SYSTEM.UNKNOWN,
            traceId: err?.traceId || null,
        });
    };



    const submitRegister = useCallback(async (payload) => {

        setIsLoading(true);
        clearError();

        try {
            await registerDetails(payload.name, payload.gender, payload.email, payload.password, payload.confirm_password);

            setEmail(payload.email);
            setStep(STEP.OTP);

        } catch (err) {
            setApiError(err);

        } finally {
            setIsLoading(false);
        }
    }, [clearError]);



    const resendOtp = useCallback(async (payload) => {

        setIsResending(true);
        clearError();

        try {
            await registerDetails(payload.name, payload.gender, payload.email, payload.password, payload.confirm_password);

        } catch (err) {
            setApiError(err);

        } finally {
            setIsResending(false);
        }
    }, [clearError]);



    const submitOtp = useCallback(async (payload) => {

        setIsLoading(true);
        clearError();

        try {
            const response = await verifyRegisterOtp(email, payload.otp_code);

            navigate(APP_ROUTES.PUBLIC.LOGIN, { state: { registered: true } });

        } catch (err) {
            setApiError(err);

        } finally {
            setIsLoading(false);
        }
    }, [clearError, email, navigate]);



    const goBackToRegisterForm = useCallback(() => {
        clearError();
        setStep(STEP.FORM);

    }, [clearError]);




    return {
        step,
        STEP,
        email,
        isLoading,
        isResending,
        error,
        clearError,
        submitRegister,
        resendOtp,
        submitOtp,
        goBackToRegisterForm
    };
};