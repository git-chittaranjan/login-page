
import { useState, useEffect, useRef } from "react";

const AvatarButton = () => {
    const [isCardOpen, setIsCardOpen] = useState(false);
    const cardRef = useRef(null);
    const buttonRef = useRef(null);

    const toggleCard = () => {
        setIsCardOpen(!isCardOpen);
    };

    // Close card when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                cardRef.current &&
                !cardRef.current.contains(event.target) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target)
            ) {
                setIsCardOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative inline-block text-left">
            <button
                ref={buttonRef}
                type="button"
                className="relative flex items-center justify-center w-10 h-10 rounded-full focus:outline-none"
                id="menu-button"
                aria-expanded={isCardOpen}
                aria-haspopup="true"
                onClick={toggleCard}
            >
                <span className="relative inline-block">
                    <img
                        src="/assets/profile_photo.png"
                        alt="Profile Photo"
                        className="w-10 h-10 rounded-full object-cover"
                    />
                    <span className="absolute bottom-0 right-0 block w-2.5 h-2.5 bg-green-800 rounded-full border-2 border-white animate-ping duration-500"></span>
                </span>
            </button>

            {isCardOpen && (
                <div
                    ref={cardRef}
                    className="absolute z-20 mt-2 w-64 right-0 bg-gray-900 rounded-lg shadow-lg p-4 border border-gray-400"
                >
                    <div className="flex items-center space-x-4">
                        <img
                            src="/assets/profile_photo.png"
                            alt="Profile"
                            className="w-14 h-14 rounded-full object-cover"
                        />
                        <div>
                            <h4 className="text-sm font-semibold text-white">Chittaranjan Saha</h4>
                            <p className="text-xs text-gray-400">Full Stack Developer</p>
                        </div>
                    </div>
                    <div className="mt-4 text-sm text-gray-200">
                        <p>Email: git.chittaranjan@gmail.com</p>
                        <p className="pt-0.5">Phone: +91-62XXXXXX35</p>

                        <p className="mt-2 font-semibold">Key Skills :</p>
                        <ul className="list-disc list-inside ml-4">
                            <li>.NET Core (MVC + Web API)</li>
                            <li>React</li>
                            <li>Java Script</li>
                            <li>SQL Server</li>
                            <li>Project Management</li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AvatarButton;
