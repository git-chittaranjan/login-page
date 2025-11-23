import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import InputField from '../components/InputField';
import { registerSchema } from '../validation/schemas';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

const Register = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', dob: '', gender: '', address: '',
        country: '', email: '', password: '', confirmPassword: '', otp: ''
    });
    const [errors, setErrors] = useState({});
    const [otpSent, setOtpSent] = useState(false);

    const handleChange = e => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setErrors({});
        try {
            await registerSchema.validate(formData, { abortEarly: false });
            if (!otpSent) {
                // Step 1: submit registration details to get OTP
                const { firstName, lastName, dob, gender, address, country, email, password } = formData;
                const res = await fetch('/api/auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ firstName, lastName, dob, gender, address, country, email, password })
                });
                if (res.ok) {
                    setOtpSent(true);
                } else {
                    const errorData = await res.json();
                    setErrors({ form: errorData.message || 'Registration failed' });
                }
            } else {
                // Step 2: verify OTP and finalize registration
                const res = await fetch('/api/auth/verify-register-otp', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
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
            if (err.inner) {
                const formErrors = {};
                err.inner.forEach(e => { formErrors[e.path] = e.message; });
                setErrors(formErrors);
            }
        }
    };

    return (
        <div>
            <Navbar title="Login" url="/login" />

            <div
                className="min-h-screen w-full flex flex-col bg-cover bg-center"
                style={{
                    backgroundImage: `url('/assets/register_bg_full.png')` // Background image for the login page
                }}
            >
                {/* Black transparent overlay */}
                <div className="absolute inset-0 bg-black/50 md:bg-black/70 lg:bg-black/85"></div>

                <div className="flex flex-1 items-center justify-center relative z-10">

                    {/* Main container with two sections */}
                    <div className="flex max-w-5xl mx-auto pt-12">

                        {/* Left-side Image Panel */}
                        <div className="hidden md:flex w-1/2 items-center justify-center relative">
                            <img
                                src="/assets/register_bg_left.png"
                                alt="Left panel image"
                                className="w-full h-full object-cover rounded-l-xl"
                            />

                            {/* Black transparent overlay */}
                            <div className="absolute inset-0 bg-black/30 z-20"></div>

                            {/* Overlay text (optional) */}
                            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center px-8 text-center">
                                <div className="space-y-4 max-w-lg">
                                    <div className="text-5xl font-semibold text-white drop-shadow-lg">
                                        Sign up now!
                                    </div>

                                    <p className="text-white text-xl px-6 py-4 rounded-lg leading-relaxed">
                                        Create your account now to unlock exciting projects, innovative ideas and stay connected with me
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right-side Register Box */}
                        <div className="w-full md:w-90 bg-black px-8 pb-8 pt-6 md:rounded-r-xl text-white">

                            <div className="text-2xl mb-4 text-center w-full text-white font-bold">
                                Register
                            </div>

                            {errors.form && (
                                <p className="text-red-500 mb-2">{errors.form}</p>
                            )}

                            <form onSubmit={handleSubmit}>
                                <InputField label="Name" name="name" value={formData.name} onChange={handleChange} error={errors.name} />
                                <label className="block text-sm font-medium text-gray-100 mb-1">Gender</label>
                                <select name="gender" value={formData.gender} onChange={handleChange} className="mb-4 px-3 py-2 border rounded w-full bg-black text-white"                            >
                                    <option value="" className="bg-black text-white">Select gender</option>
                                    <option value="male" className="bg-black text-white">Male</option>
                                    <option value="female" className="bg-black text-white">Female</option>
                                    <option value="other" className="bg-black text-white">Other</option>
                                </select>
                                {errors.gender && <p className="text-red-500 text-xs mb-2">{errors.gender}</p>}
                                <InputField label="Email" type="email" name="email" value={formData.email} onChange={handleChange} error={errors.email} />
                                <InputField label="Password" type="password" name="password" value={formData.password} onChange={handleChange} error={errors.password} />
                                <InputField label="Confirm Password" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} error={errors.confirmPassword} />
                                {otpSent && (
                                    <InputField label="OTP" type="text" name="otp" value={formData.otp} onChange={handleChange} error={errors.otp} />
                                )}
                                <div className="flex justify-center">
                                    <button
                                        type="submit"
                                        className="w-2/3 bg-orange-700 text-white py-2 px-4 rounded mt-4"
                                    >
                                        {otpSent ? 'Verify OTP & Register' : 'Send OTP'}
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

export default Register;
