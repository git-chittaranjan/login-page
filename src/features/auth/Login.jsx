
import { useState } from "react";
import InputField from "../../components/InputField";
import Navbar from "../../components/pre-auth-navbar";
import Footer from "../../components/footer";
import { Eye, EyeOff } from "lucide-react";
import { useLogin } from "./hooks/useLogin";


const Login = () => {

    // ==================== Hooks and States ====================
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
    } = useLogin();



    const [formData, setFormData] = useState({ email: "", password: "", otp_code: "" });
    const [fieldErrors, setFieldErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);



    // ==================== Handlers ====================
    const handleChange = (e) => {
        setShowPassword(false);
        const { name, value } = e.target;

        // OTP field: Digits only ("12a3#4" → "1234")
        const sanitized = name === "otp_code" ? value.replace(/\D/g, "") : value;

        setFormData((prev) => ({ ...prev, [name]: sanitized }));
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        setShowPassword(false);
        setFieldErrors({});

        if (step === STEP.CREDENTIALS) {

            // Client-side Yup validation. Dynamic import, Loads loginSchema only when needed, Uses code-splitting / lazy loading
            const { loginSchema } = await import("./validation/schemas");

            try {
                await loginSchema.validate(
                    {
                        email: formData.email,
                        password: formData.password
                    },
                    { abortEarly: false } //Default: stops at first error. false - collects all errors
                );

            } catch (err) {

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

    // otpSent drives the same conditional rendering your JSX already uses
    const otpSent = step === STEP.OTP;

    return (
        <div>
            <Navbar title="Register" url="/register" />

            <div
                className="relative min-h-screen w-full flex flex-col bg-cover bg-center"
                style={{
                    backgroundImage: `url('/assets/login_bg_full.png')`,
                }}
            >
                <div className="absolute inset-0 bg-black/50 md:bg-black/70 lg:bg-black/80"></div>

                <div className="flex flex-1 items-center justify-center relative z-10">
                    <div className="flex max-w-5xl mx-auto">

                        {/* Left-side Image Panel — unchanged */}
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

                        {/* Right-side Login Box — unchanged except error wiring */}
                        <div className="w-full md:w-90 bg-black p-8 md:rounded-r-xl text-white">
                            <div className="text-2xl mb-4 text-center w-full text-white font-bold">
                                {otpSent ? "Verify OTP" : "Login"}
                            </div>

                            {/* API error banner — replaces your errors.form <p> */}
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

                            <form onSubmit={handleSubmit}>
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
                                            className="text-gray-400 hover:text-white focus:outline-none"
                                            aria-label={showPassword ? "Hide password" : "Show password"}
                                            tabIndex={-1}
                                        >
                                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    }
                                />


                                {/* Show OTP field only after credentials are submitted successfully and OTP is sent */}
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
                                        className="w-2/3 bg-emerald-700 text-white py-2 px-4 rounded mt-4 font-bold disabled:opacity-50"
                                    >
                                        {isLoading
                                            ? otpSent ? "Verifying OTP" : "Sending OTP"
                                            : otpSent ? "Verify OTP & Login" : "Send OTP"}
                                    </button>
                                </div>

                                {otpSent && (
                                    <div className="flex justify-center mt-3">
                                        <button
                                            type="button"
                                            onClick={goBackToCredentials}
                                            disabled={isLoading}
                                            className="text-sm text-gray-400 hover:text-white underline"
                                        >
                                            Back to login
                                        </button>
                                    </div>
                                )}


                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Login;