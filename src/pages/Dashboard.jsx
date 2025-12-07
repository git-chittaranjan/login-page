import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import ProjectGrid from '../components/projects.';
import Footer from '../components/footer';
import DashboardNavbar from '../components/dashboard-navbar';

const Dashboard = () => {
    const { user, logout } = useAuth();

    return (
        <div>
            <DashboardNavbar />

            <div className="pt-20 lg:pt-20 pb-20 lg:pb-25 bg-black w-full">
                <div className="relative w-full py-10 bg-center bg-cover bg-no-repeat overflow-hidden" style={{ backgroundImage: "url('assets/dashboard-bg.png')" }}>
                    {/* Overlay a semi-transparent layer above the background image but below the content. */}
                    <div className="absolute inset-0 bg-black/50"></div>

                    <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto px-4">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">Hi, Chittaranjan Saha</h2>
                        <h4 className="text-lg md:text-xl text-gray-300 mt-2 md:mt-3 tracking-wide font-mono">Welcome to my Workspace</h4>

                        <div className="w-32 md:w-36 lg:w-40 h-1 bg-teal-600 mt-6 rounded-full shadow-[0_0_15px_rgba(0,255,255,0.5)]"></div>

                        <p className="text-gray-200 mt-8 text-base md:text-lg leading-relaxed font-medium max-w-3xl">
                            Discover a range of practical and innovative projects built across frontend, backend and full-stack architectures. Every project reflects continuous learning and a drive to build meaningful digital solutions with modern technologies.
                        </p>
                    </div>

                </div>

                <div className="mt-16 px-8 max-w-7xl mx-auto">
                    <ProjectGrid name="Saheb Saha" />
                </div>

            </div>

            <Footer />
        </div>
    );
};

export default Dashboard;
