import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";
import AvatarButton from './avatar-card';

const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);  // ← new
    const navigate = useNavigate();
    const { logout } = useAuth();

    const toggleMenu = () => setIsOpen(!isOpen);

    const navLinkClass = ({ isActive }) =>
        isActive
            ? 'text-black bg-gray-200 px-2 py-1 rounded hover:text-black hover:bg-gray-200'
            : 'text-white px-2 py-1 rounded hover:text-black hover:bg-gray-200';

    const mobileNavLinkClass = ({ isActive }) =>
        isActive
            ? 'block px-4 rounded-2xl text-orange-500 active:bg-gray-600'
            : 'block px-4 rounded-2xl text-white hover:text-orange-500 active:bg-gray-600';

    // Opens the confirmation modal
    function handleLogoutClick() {
        setIsOpen(false);           // close mobile menu if open
        setShowLogoutModal(true);
    }

    // Called when user confirms logout
    function handleLogoutConfirm() {
        setShowLogoutModal(false);

        try {
            const channel = new BroadcastChannel("auth_session");
            channel.postMessage({ type: "LOGOUT" });
            channel.close();
        } catch {
            // degrade gracefully
        }

        logout();
        navigate('/login', { replace: true });
    }

    return (
        <>
            <header className="w-full bg-black border-b-2 border-gray-700 fixed top-0 left-0 z-50">
                <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

                    {/* Mobile Toggle and Name */}
                    <div className="flex items-center gap-x-2">
                        <button
                            onClick={toggleMenu}
                            className="md:hidden text-white hover:text-gray-400 focus:outline-none"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                        <NavLink to="/dashboard" className="sm:text-xl md:text-2xl font-bold text-white">
                            Chittaranjan Saha
                        </NavLink>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-6 text-sm font-bold ml-auto mr-6">
                        <NavLink to="/dashboard" className={navLinkClass}>Home</NavLink>
                        <NavLink to="/contact" className={navLinkClass}>Connect Me</NavLink>
                        <NavLink to="/profile" className={navLinkClass}>Profile</NavLink>
                    </nav>

                    <div className="flex items-center space-x-4 md:space-x-8 text-sm font-bold">
                        <button
                            onClick={handleLogoutClick}
                            className="text-white bg-gray-800 hover:text-black hover:bg-gray-200 px-2 py-1 rounded"
                        >
                            Logout
                        </button>
                        <AvatarButton />
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <div className="md:hidden px-4 pb-4 space-y-2 text-sm font-medium">
                        <NavLink to="/dashboard" className={mobileNavLinkClass} onClick={toggleMenu}>Home</NavLink>
                        <NavLink to="/contact" className={mobileNavLinkClass} onClick={toggleMenu}>Connect Me</NavLink>
                        <NavLink to="/profile" className={mobileNavLinkClass} onClick={toggleMenu}>Profile</NavLink>
                        <button
                            onClick={handleLogoutClick}
                            className="block px-4 text-white hover:text-orange-500 active:bg-gray-600 rounded-2xl w-full text-left"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </header>

            {/* ── Logout Confirmation Modal ── */}
            {showLogoutModal && (
                <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="bg-gray-900 border border-gray-700 rounded-xl shadow-2xl w-full max-w-sm mx-4 p-6">

                        <h2 className="text-white text-lg font-semibold mb-2">Confirm Logout</h2>
                        <p className="text-gray-400 text-sm mb-6">
                            Are you sure you want to log out of your account?
                        </p>

                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => setShowLogoutModal(false)}
                                className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-800 hover:bg-gray-700 rounded-lg transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleLogoutConfirm}
                                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-500 rounded-lg transition"
                            >
                                Yes, Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;