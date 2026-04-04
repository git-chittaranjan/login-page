
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import AvatarButton from './avatar-card';
import { Link } from "react-router-dom";

const Navbar = ({ title, url }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <header className="w-full bg-black border-b-2 border-white fixed top-0 left-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

                {/* Left - Mobile Toggle and Name */}
                <div className="flex items-center gap-x-2">
                    <button
                        onClick={toggleMenu}
                        className="md:hidden text-white hover:text-gray-400 focus:outline-none"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>

                    <a href="/" className="sm:text-xl md:text-2xl font-bold text-white">
                        Chittaranjan Saha
                    </a>
                </div>


                <div className="flex items-center space-x-4 md:space-x-8 text-sm font-bold">
                    <div className="flex items-center space-x-4">
                        <a href="https://www.chittaranjansaha.com/" className="hidden md:inline text-white bg-gray-800 hover:text-black hover:bg-gray-200 px-2 py-1 rounded"                    >
                            Home
                        </a>
                        <Link to={url} className="text-white bg-gray-800 hover:text-black hover:bg-gray-200 px-2 py-1 rounded">
                            {title}
                        </Link>
                    </div>

                    <AvatarButton />
                </div>
            </div>


            {/* Mobile Navigation */}
            {isOpen && (
                <div className="md:hidden px-4 pb-4 space-y-2 text-sm font-medium text-white">
                    <a href="https://www.chittaranjansaha.com/" className="block px-4 text-white hover:text-orange-500 active:bg-gray-600 rounded-2xl">Home</a>
                    <Link to="/register" className="block px-4 text-white hover:text-orange-500 active:bg-gray-600 rounded-2xl">
                        Register
                    </Link>
                    <Link to="/login" className="block px-4 text-white hover:text-orange-500 active:bg-gray-600 rounded-2xl">
                        Login
                    </Link>
                </div>
            )}
        </header>
    );
};

export default Navbar;
