import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import InputField from "../../components/InputField";
import Navbar from "../../components/pre-auth-navbar";
import Footer from "../../components/footer";
import { Eye, EyeOff } from "lucide-react";
import { useLogin } from "./hooks/useLogin";
import { CONFIG } from "../../config/env";
import { toast } from "react-toastify";



// Masks email: chittaranjan@gmail.com → ch*********@gmail.com
const maskEmail = (email) => {
    if (!email) return "";
    const [local, domain] = email.split("@");
    if (!domain) return email;
    const visible = local.slice(0, 2);
    const masked = "*".repeat(local.length - 2);
    return `${visible}${masked}@${domain}`;
};

const RESEND_COOLDOWN_SECONDS = CONFIG.OTP_RESEND_COOLDOWN_SECONDS;



const Login = () => {

    // ==================== Call useLogin Hook ====================
    const {
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
    } = useLogin();


    // Show session-expired toast exactly once, then clear state so it doesn't re-appear on refresh
    useEffect(() => {
        if (!sessionMessage) return;
        toast.error(sessionMessage);
        window.history.replaceState({}, "");
    }, []);



    const [formData, setFormData] = useState({ email: "", password: "", otp_code: "" });
    const [fieldErrors, setFieldErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const [resendCooldown, setResendCooldown] = useState(0);
    const cooldownRef = useRef(null);



    // Start cooldown timer the moment OTP step is entered)
    useEffect(() => {
        if (step === STEP.OTP) {
            startCooldown();
        }

        return () => clearInterval(cooldownRef.current);
    }, [step]);



    // Starts a countdown timer (cooldown) that decreases every second.
    const startCooldown = () => {

        clearInterval(cooldownRef.current);
        setResendCooldown(RESEND_COOLDOWN_SECONDS);

        cooldownRef.current = setInterval(() => {
            setResendCooldown((prev) => {
                if (prev <= 1) {
                    clearInterval(cooldownRef.current);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };



    // Converts a time value in seconds into a MM:SS (65 → "01:05")
    const formatCountdown = (seconds) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, "0");
        const s = (seconds % 60).toString().padStart(2, "0");
        return `${m}:${s}`;
    };



    // ==================== Handlers ====================

    const handleChange = (e) => {
        const { name, value } = e.target;

        clearError();
        setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
        setShowPassword(false);

        const sanitized = name === "otp_code" ? value.replace(/\D/g, "") : value;
        setFormData((prev) => ({ ...prev, [name]: sanitized }));
    };



    const handleSubmit = async (e) => {

        e.preventDefault();
        setShowPassword(false);
        setFieldErrors({});

        if (step === STEP.CREDENTIALS) {

            const { loginSchema } = await import("./validation/schemas");

            try {
                await loginSchema.validate(
                    {
                        email: formData.email,
                        password: formData.password
                    },
                    { abortEarly: false }
                );

            } catch (err) {

                clearError();

                if (err.inner) {
                    const errs = {};
                    err.inner.forEach((e) => (errs[e.path] = e.message));
                    setFieldErrors(errs);
                    return;
                }
            }

            await submitCredentials({ email: formData.email, password: formData.password });

        } else {

            const { otpSchema } = await import("./validation/schemas");

            try {
                await otpSchema.validate(
                    { otp_code: formData.otp_code },
                    { abortEarly: false }
                );

            } catch (err) {

                clearError();

                if (err.inner) {
                    const errs = {};
                    err.inner.forEach((e) => (errs[e.path] = e.message));
                    setFieldErrors(errs);
                    return;
                }
            }

            await submitOtp({ otp_code: formData.otp_code });
        }
    };



    const handleResendOtp = async () => {

        if (resendCooldown > 0 || isLoading) return;

        clearError();

        setIsResending(true);
        await submitCredentials({ email: formData.email, password: formData.password });
        setIsResending(false);

        startCooldown();
    };



    const handleGoBack = () => {
        clearError();
        clearInterval(cooldownRef.current);
        setResendCooldown(0);
        setFormData((prev) => ({ ...prev, otp_code: "" }));
        setFieldErrors({});
        goBackToCredentials();
    };


    const otpSent = step === STEP.OTP;



    // ==================== Render ====================
    return (
        <div>
            <Navbar title="Register" url="/register" />

            <div
                className="relative min-h-screen w-full flex flex-col bg-cover bg-center pt-20"
                style={{ backgroundImage: `url('/assets/login_bg_full.png')` }}
            >
                <div className="absolute inset-0 bg-black/40 md:bg-black/70 lg:bg-black/80"></div>

                <div className="flex flex-1 items-center justify-center relative z-10 py-8">
                    <div className="flex max-w-5xl mx-auto w-full">

                        {/* Left-side Image Panel */}
                        <div className="hidden md:flex w-1/2 items-center justify-center relative">
                            <img
                                src="/assets/login_bg_left.png"
                                alt="Left panel image"
                                className="w-full h-full object-cover rounded-l-xl"
                            />
                            <div className="absolute inset-0 bg-black/25 z-20"></div>
                            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center px-8 text-center">
                                <div className="space-y-4 max-w-lg">
                                    <div className="text-5xl font-semibold text-white drop-shadow-lg">
                                        Welcome Back!
                                    </div>
                                    <p className="text-white text-xl px-6 pt-4 rounded-lg leading-relaxed">
                                        Please enter your credentials to access your dashboard
                                    </p>
                                </div>
                            </div>
                        </div>


                        {/* Right-side Login Box */}
                        <div className={`w-full md:w-90 bg-black p-8 md:rounded-r-xl text-white ${!otpSent ? "pb-25" : ""}`}>

                            <div className="text-2xl mb-4 text-center w-full text-white font-bold">
                                {otpSent ? "Verify OTP" : "Login"}
                            </div>


                            {/* Masked email confirmation */}
                            <p className="text-sm text-gray-400 text-center mb-8">
                                {otpSent ? (
                                    <>
                                        OTP sent to{" "}
                                        <span className="text-white font-medium">
                                            {maskEmail(email || formData.email)}
                                        </span>
                                    </>
                                ) : (
                                    "Enter credentials to access your account"
                                )}
                            </p>


                            {/* API error messages */}
                            {error && (
                                <div className="text-red-500 mb-2">
                                    <p>{error.message}</p>
                                    {error.traceId && (
                                        <p className="text-xs text-red-400 mt-1">
                                            Ref: {error.traceId}
                                        </p>
                                    )}
                                </div>
                            )}


                            <form noValidate onSubmit={handleSubmit}>
                                <InputField
                                    label="Email"
                                    type="email"
                                    name="email"
                                    autoComplete="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    error={fieldErrors.email}
                                    disabled={isLoading || otpSent}
                                />

                                <InputField
                                    label="Password"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    autoComplete="current-password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    error={fieldErrors.password}
                                    disabled={isLoading || otpSent}
                                    rightElement={
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword((prev) => !prev)}
                                            className="text-gray-500 hover:text-white focus:outline-none"
                                            aria-label={showPassword ? "Hide password" : "Show password"}
                                            tabIndex={-1}
                                        >
                                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    }
                                />

                                {/* Forgot Password — credentials step only, sits right below password field */}
                                {/* {!otpSent && (
                                    <div className="flex justify-end -mt-2 mb-2">
                                        <Link
                                            to="/forgot-password"
                                            className="text-sm text-gray-400 hover:text-white underline"
                                        >
                                            Forgot Password?
                                        </Link>
                                    </div>
                                )} */}

                                {!otpSent && (
                                    <div className="flex justify-end -mt-2 mb-2">
                                        <button
                                            type="button"
                                            onClick={() => toast.warning('Forgot Password is not implemented')}
                                            className="text-sm text-gray-400 hover:text-white underline bg-transparent border-none cursor-pointer p-0"
                                        >
                                            Forgot Password?
                                        </button>
                                    </div>
                                )}


                                {/* OTP field — shown only after credentials accepted */}
                                {otpSent && (
                                    <InputField
                                        label="OTP"
                                        type="text"
                                        name="otp_code"
                                        autoComplete="one-time-code"
                                        inputMode="numeric"
                                        maxLength={6}
                                        value={formData.otp_code}
                                        onChange={handleChange}
                                        error={fieldErrors.otp_code}
                                        disabled={isLoading}
                                    />
                                )}

                                <div className="flex justify-center">
                                    <button
                                        type="submit"
                                        disabled={isLoading || (otpSent && formData.otp_code.length !== 6)}
                                        className="w-2/3 bg-emerald-900 text-white py-2 px-4 rounded mt-4 font-bold transition duration-200 ease-in-out hover:bg-emerald-800 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-emerald-900 disabled:hover:scale-100"
                                    >
                                        {isLoading
                                            ? isResending ? "Resending OTP" : otpSent ? "Verifying" : "Sending OTP"
                                            : otpSent ? "Sign In" : "Continue"
                                        }
                                    </button>
                                </div>



                                {/* OTP step — Resend + Back */}
                                {otpSent && (
                                    <div className="flex flex-col items-center gap-4 mt-8">

                                        {/* Resend OTP / Countdown */}
                                        <div className="text-sm text-gray-400">
                                            {resendCooldown > 0 ? (
                                                <p className="flex items-center gap-1">
                                                    <span>Resend OTP in</span>
                                                    <span className="font-semibold text-white tracking-wide">
                                                        {formatCountdown(resendCooldown)}
                                                    </span>
                                                </p>
                                            ) : (
                                                <button
                                                    type="button"
                                                    onClick={handleResendOtp}
                                                    disabled={isLoading}
                                                    className="px-4 py-1.5 font-sans rounded-md bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20 hover:text-emerald-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    {isResending ? "Resending…" : "Resend OTP"}
                                                </button>
                                            )}
                                        </div>

                                        {/* Divider */}
                                        <div className="w-16 h-px bg-gray-700"></div>

                                        {/* Back to login */}
                                        <button
                                            type="button"
                                            onClick={handleGoBack}
                                            disabled={isLoading}
                                            className="text-sm text-gray-400 hover:text-white transition underline underline-offset-4"
                                        >
                                            Back to Login Form
                                        </button>
                                    </div>
                                )}


                                {/* Don't have an account — credentials step only */}
                                {!otpSent && (
                                    <p className="text-sm text-gray-400 text-center mt-8">
                                        Don't have an account?{" "}
                                        <Link
                                            to="/register"
                                            className="text-emerald-600 hover:text-emerald-300 underline font-medium"
                                        >
                                            Register
                                        </Link>
                                    </p>
                                )}

                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* <Footer /> */}
        </div>
    );
};

export default Login;