import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { useAuth } from '../contexts/AuthContext';
import AvatarButton from './avatar-card';

const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const { logout } = useAuth();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    // Reusable Web NavLink style function
    const navLinkClass = ({ isActive }) =>
        isActive
            ? 'text-black bg-gray-200 px-2 py-1 rounded hover:text-black hover:bg-gray-200'
            : 'text-white px-2 py-1 rounded hover:text-black hover:bg-gray-200';

    // Reusable Mobile navlink style function
    const mobileNavLinkClass = ({ isActive }) =>
        isActive
            ? 'block px-4 rounded-2xl text-orange-500 active:bg-gray-600'
            : 'block px-4 rounded-2xl text-white hover:text-orange-500 active:bg-gray-600';



    // Logout handler — use useNavigate
    function handleLogout() {

        // Broadcast to other tabs
        try {
            const channel = new BroadcastChannel("auth_session");
            channel.postMessage({ type: "LOGOUT" });
            channel.close();

        } catch {
            // degrade gracefully
        }

        // ProtectedRoute sees isLoggingOut and renders null instead of redirecting
        logout();

        toast.success("You've been logged out. Redirecting...", {
            duration: LOGOUT_DELAY_MS,
        });

        setTimeout(() => {
            navigate('/login', { replace: true });
        }, 3000);
    }

    return (
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

                    <NavLink to="/dashboard" className="sm:text-xl md:text-2xl font-bold text-white">Chittaranjan Saha</NavLink>
                </div>


                {/* Desktop Navigation */}
                <nav className="hidden md:flex space-x-6 text-sm font-bold ml-auto mr-6">
                    <NavLink to="/dashboard" className={navLinkClass}>Home</NavLink>
                    <NavLink to="/contact" className={navLinkClass}>Connect Me</NavLink>
                    <NavLink to="/profile" className={navLinkClass}>Profile</NavLink>
                </nav>


                <div className="flex items-center space-x-4 md:space-x-8 text-sm font-bold">
                    <button
                        onClick={handleLogout}
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
                        onClick={handleLogout}
                        className="block px-4 text-white hover:text-orange-500 active:bg-gray-600 rounded-2xl w-full text-left"
                    >
                        Logout
                    </button>
                </div>
            )}
        </header>
    );
};

export default Navbar;