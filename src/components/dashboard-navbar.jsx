
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import AvatarButton from './avatar-card';
import { Link } from "react-router-dom";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <header className="w-full bg-black border-b-2 border-gray-700 fixed top-0 left-0 z-50">
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

                    <a href="/dashboard" className="sm:text-xl md:text-2xl font-bold text-white">
                        Chittaranjan Saha
                    </a>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex space-x-6 text-sm font-bold text-white ml-auto mr-6">
                    <a href="/dashboard" className="hover:text-black hover:bg-gray-200 px-2 py-1 rounded">Home</a>
                    <a href="#contact" className="hover:text-black hover:bg-gray-200 px-2 py-1 rounded">Connect Me</a>
                    <a href="#articles" className="hover:text-black hover:bg-gray-200 px-2 py-1 rounded">Articles</a>
                </nav>

                <div className="flex items-center space-x-4 md:space-x-8 text-sm font-bold">
                    <a href="#logout" className="text-white bg-gray-800 hover:text-black hover:bg-gray-200 px-2 py-1 rounded"                    >
                        Logout
                    </a>
                    <AvatarButton />
                </div>
            </div>


            {/* Mobile Navigation */}
            {isOpen && (
                <div className="md:hidden px-4 pb-4 space-y-2 text-sm font-medium text-white">
                    <a href="/dashboard" className="block px-4 text-white hover:text-orange-500 active:bg-gray-600 rounded-2xl">Home</a>
                    <a href="#contact" className="block px-4 text-white hover:text-orange-500 active:bg-gray-600 rounded-2xl">Connect Me</a>
                    <a href="#articles" className="block px-4 text-white hover:text-orange-500 active:bg-gray-600 rounded-2xl">Articles</a>
                    <a href="#logout" className="block px-4 text-white hover:text-orange-500 active:bg-gray-600 rounded-2xl">Logout</a>
                </div>
            )}
        </header>
    );
};

export default Navbar;
