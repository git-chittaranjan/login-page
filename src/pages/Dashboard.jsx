import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
    const { user, logout } = useAuth();

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border rounded">
            <h2 className="text-2xl mb-4">Dashboard</h2>
            {user ? (
                <>
                    <p><strong>Welcome,</strong> {user.firstName} {user.lastName}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    {/* show other user info as needed */}
                    <button
                        onClick={logout}
                        className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
                    >
                        Logout
                    </button>
                </>
            ) : (
                <p>Loading user info...</p>
            )}
        </div>
    );
};

export default Dashboard;
