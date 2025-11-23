import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import InputField from '../components/InputField';
import { loginSchema } from '../validation/schemas';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '', otp: '' });
    const [errors, setErrors] = useState({});
    const [otpSent, setOtpSent] = useState(false);

    const handleChange = e => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setErrors({});
        try {
            await loginSchema.validate(formData, { abortEarly: false });
            if (!otpSent) {
                // Step 1: submit email/password to trigger OTP
                const res = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: formData.email, password: formData.password })
                });
                if (res.ok) {
                    setOtpSent(true);
                } else {
                    const errorData = await res.json();
                    setErrors({ form: errorData.message || 'Login failed' });
                }
            } else {
                // Step 2: verify OTP and log in
                const res = await fetch('/api/auth/verify-login-otp', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include', // send HttpOnly cookie
                    body: JSON.stringify({ email: formData.email, otp: formData.otp })
                });
                if (res.ok) {
                    const data = await res.json();
                    // Expecting { user: {...}, accessToken: '...' }
                    login(data.user, data.accessToken);
                    navigate('/dashboard');
                } else {
                    const errorData = await res.json();
                    setErrors({ otp: errorData.message || 'Invalid OTP' });
                }
            }
        } catch (err) {
            // Handle validation errors from Yup
            if (err.inner) {
                const formErrors = {};
                err.inner.forEach(e => { formErrors[e.path] = e.message; });
                setErrors(formErrors);
            }
        }
    };

    return (

        <div>
            <Navbar title="Register" url="/register" />

            <div
                className="
    min-h-screen w-full flex flex-col
    bg-cover bg-center bg-black
    bg-[url('/assets/login_bg_full.png')]   /* show on small screens */
    md:bg-none                               /* hide from md and above */
  "
            >
                <div className="flex flex-1 items-center justify-center">

                    {/* Main container with two sections */}
                    <div className="flex max-w-5xl mx-auto">

                        {/* Left-side Image Panel */}
                        <div className="hidden md:flex w-1/2 items-center justify-center relative">
                            <img
                                src="/assets/login_bg_left.png"
                                alt="Left panel image"
                                className="w-full h-full object-cover rounded-l-xl"
                            />

                            {/* Overlay text (optional) */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
                                <div className="space-y-4 max-w-lg">
                                    <div className="text-5xl font-semibold text-white drop-shadow-lg">
                                        Welcome Back!
                                    </div>

                                    <p className="text-white text-xl px-6 pt-4 rounded-lg leading-relaxed">
                                        Please enter your credentials to access your dashboard
                                    </p>

                                    {/* <p className="text-white text-xl px-6 pb-6 rounded-lg leading-relaxed">
                                        Don't have an account? <br /> Click on Register and get started!
                                    </p> */}
                                </div>
                            </div>

                        </div>

                        {/* Right-side Login Box */}
                        <div className="w-full md:w-90 bg-black p-8 md:rounded-r-xl border text-white">

                            <div className="text-2xl mb-4 text-center w-full text-white font-bold">
                                Login
                            </div>

                            {errors.form && (
                                <p className="text-red-500 mb-2">{errors.form}</p>
                            )}

                            <form onSubmit={handleSubmit}>

                                <InputField
                                    label="Email"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    error={errors.email}
                                />

                                <InputField
                                    label="Password"
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    error={errors.password}
                                />

                                {otpSent && (
                                    <InputField
                                        label="OTP"
                                        type="text"
                                        name="otp"
                                        value={formData.otp}
                                        onChange={handleChange}
                                        error={errors.otp}
                                    />
                                )}

                                <div className="flex justify-center">
                                    <button
                                        type="submit"
                                        className="w-2/3 bg-emerald-700 text-white py-2 px-4 rounded mt-4 font-bold"
                                    >
                                        {otpSent ? 'Verify OTP & Login' : 'Send OTP'}
                                    </button>
                                </div>
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
