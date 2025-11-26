import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import ProjectGrid from '../components/projects.';
import Footer from '../components/footer';
import DashboardNavbar from '../components/dashboard-navbar';

const Dashboard = () => {
    const { user, logout } = useAuth();

    return (
        // <div className="max-w-md mx-auto mt-10 p-6 border rounded">
        //     <h2 className="text-2xl mb-4">Dashboard</h2>
        //     {user ? (
        //         <>
        //             {/* <p><strong>Welcome,</strong> {user.firstName} {user.lastName}</p>
        //             <p><strong>Email:</strong> {user.email}</p> */}

        //             {/* show other user info as needed */}
        //             <button
        //                 onClick={logout}
        //                 className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
        //             >
        //                 Logout
        //             </button>
        //         </>
        //     ) : (
        //         <p>Loading user info...</p>
        //     )}
        // </div>

        <div>
            <DashboardNavbar />

            <div className="pt-30 pb-20 lg:pt-30 lg:pb-25 bg-black w-full">
                <div className="px-4 max-w-7xl mx-auto">

                    <div className="flex flex-col w-full pt-2 pb-15 lg:pb-20 px-2">
                        {/* Top Div */}
                        <div className="w-full flex flex-col items-center justify-center text-center mb-8 md:mb-8 lg:mb-0">
                            <h2 className="text-3xl md:text-4xl font-bold text-white font-serif">
                                Hi, {name}
                            </h2>
                            <h4 className="text-lg md:text-xl pt-3 font-mono text-gray-200 lg:text-gray-300">
                                Welcome to my Workspace
                            </h4>
                        </div>

                        {/* Below Div */}
                        <div className="w-full lg:w-4/5 mx-auto text-center lg:pt-10">
                            <div
                                className="w-3/4 lg:w-3/5 h-1 rounded mx-auto"
                                style={{
                                    background: "linear-gradient(to right, black, white, black)"
                                }}
                            ></div>

                            <div className="text-gray-100 mt-2 md:mt-4 lg:mt-2 font-serif text-justify lg:text-center leading-relaxed">
                                <p>
                                    Discover a range of practical and innovative projects built across
                                    frontend, backend and full-stack architectures. Every project reflects
                                    continuous learning and a drive to build meaningful digital solutions
                                    with modern technologies.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <ProjectGrid name="Saheb Saha" />
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Dashboard;
