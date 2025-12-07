import { motion } from "framer-motion";
import { Github } from "lucide-react";
import { FiGlobe } from "react-icons/fi";

const projects = [
    {
        id: 1,
        title: "Personal Portfolio Website",
        description: "Designed and developed a responsive personal website using modern web technologies to showcase Technical Skills, Experience, and Personal Projects. Implemented Routing and a Contact form integrated with Email Service.",
        technologies: [
            "React",
            "Tailwind",
            "EmailJS",
            "HTML",
            "CSS",
            "JS"
        ],
        image: "/assets/projects/personal-website.png",
        visitLink: "https://www.chittaranjansaha.com/",
        codeLink: "https://github.com/git-chittaranjan/personal-website",
        enableVisit: true,
        enableCode: true
    },
    {
        id: 2,
        title: "Certification Verification App",
        description: "Developed a web application for real-time certificate verification, enabling users to authenticate issued certificates via unique Certificate IDs or embedded QR codes. Built using Next.js and React, with dynamic PDF generation using pdf-lib and rendering through pdfjs-dist.",
        technologies: [
            "React",
            "Tailwind",
            "Router",
            "pdf-lib",
            "pdfjs-dist",
            "ErrorBoundary"
        ],
        image: "/assets/projects/certificate-verification.jpg",
        visitLink: "https://www.projects.certificate-verification.chittaranjansaha.com/?id=EMLC-0325-WWMPQO9L7X",
        codeLink: "https://github.com/git-chittaranjan/certificate-verification-app",
        enableVisit: true,
        enableCode: true
    },
    {
        id: 3,
        title: "Invoice PDF Generation",
        description: "Built a React-based solution for generating invoice PDFs using the @react-pdf library. Designed dynamic, styled invoice templates with real-time data binding, enabling seamless PDF creation and download directly from the browser.",
        technologies: [
            "Next.js",
            "Tailwind",
            "react-pdf",
            "react-pdf-table",
            "Fetch API"
        ],
        image: "/assets/projects/invoice-generator.jpg",
        visitLink: "https://www.projects.invoice-generator.chittaranjansaha.com/",
        codeLink: "https://github.com/git-chittaranjan/invoice-generator",
        enableVisit: true,
        enableCode: true
    },
    {
        id: 4,
        title: "QR Code Generator",
        description: "This React project generates a customized downloadable PDF containing a QR code from a user-provided URL input. It uses react-qr-code, html-to-image, and pdf-lib to create and download the QR as a PDF.",
        technologies: [
            "React",
            "Tailwind",
            "pdf-lib",
            "html-to-image",
            "react-qr-code"
        ],
        image: "/assets/projects/qr-code-generator.jpg",
        visitLink: "https://www.projects.qr-code-generator.chittaranjansaha.com/",
        codeLink: "https://github.com/git-chittaranjan/qr-code-generator",
        enableVisit: true,
        enableCode: true
    },
    {
        id: 5,
        title: "Authenticated Application",
        description: "This is a cloud-hosted, authenticated web application using SQL Server database, .NET for backend and Azure Cloud for hosting. It enables user registration, email-based OTP login, and provides a personalized dashboard upon successful authentication.",
        technologies: [
            "SQL Server",
            "ASP.NET Core",
            "React",
            "Hashing & Salting",
            "OTP Authentication"
        ],
        image: "/assets/projects/login-page.jpg",
        visitLink: "https://www.app.chittaranjansaha.com/",
        codeLink: "https://github.com/git-chittaranjan/login-page",
        enableVisit: true,
        enableCode: true
    },
    {
        id: 6,
        title: "UUID Generator Application",
        description: "A React-based Unique ID Generator that uses a custom algorithm, combining the current timestamp with random alphanumeric values to create unique IDs. It provides a clean interface where users can instantly create, view, and copy unique identifiers effortlessly.",
        technologies: [
            "React",
            "Tailwind",
            "Math.random()",
            "Date.now()"
        ],
        image: "/assets/projects/uuid-generator.png",
        visitLink: "https://www.projects.uuid-generator.chittaranjansaha.com/",
        codeLink: "https://github.com/git-chittaranjan/uuid-generator",
        enableVisit: true,
        enableCode: true
    },
    {
        id: 7,
        title: "Certificate PDF Generator",
        description: "Built a React-based certificate generator that dynamically injects user data, embeds a QR code, and produces a styled PDF using pdf-lib.  It embeds student names, course details, and course completion date directly onto certificate templates for instant download.",
        technologies: [
            "React",
            "pdf-lib",
            "react-qr-code",
            "JS (ES6+)"
        ],
        image: "/assets/projects/certificate-generator.jpg",
        visitLink: "https://www.projects.certificate-generator.chittaranjansaha.com/",
        codeLink: "https://github.com/git-chittaranjan/certificate-generator",
        enableVisit: true,
        enableCode: true
    },
    {
        id: 8,
        title: "Offer Management System",
        description: "This project is a Personalized Offer Management System built with ASP.NET Core Web APIs, React, and SQL Server. It dynamically delivers customized user offers based on preferences and data, ensuring an engaging and data-driven experience.",
        technologies: [
            "SQL Server",
            "ASP.NET Core",
            "React",
            "ADO.NET",
            "Offers"
        ],
        image: "/assets/projects/offers-implementation.png",
        visitLink: "https://www.projects.offers-implementation.chittaranjansaha.com/",
        codeLink: "https://github.com/git-chittaranjan/offers-implementation-api",
        enableVisit: true,
        enableCode: true
    },
    {
        id: 9,
        title: "CRUD Application using MVC",
        description: "Developed a web-based CRUD (Create, Read, Update, Delete) application using ASP.NET MVC and Entity Framework. Implemented layered architecture with proper separation of concerns, integrated SQL Server database interactions using EF Code First approach.",
        technologies: [
            ".NET Core MVC",
            "Entity Framework",
            "SQL Server",
            "Bootstrap"
        ],
        image: "/assets/projects/mvc.png",
        visitLink: "",
        codeLink: "",
        enableVisit: false,
        enableCode: false
    },
    {
        id: 10,
        title: "Online Shopping Cart Application",
        description: "Developed a responsive online shopping cart application using React, incorporating React Router for seamless navigation, Context API for efficient state management across components, and Firebase for real-time database and authentication support.",
        technologies: [
            "React",
            "Firebase",
            "react-router",
            "Context API",
            "API Integration"
        ],
        image: "/assets/projects/shopping.png",
        visitLink: "",
        codeLink: "https://github.com/git-chittaranjan/shopping-cart",
        enableVisit: false,
        enableCode: false
    },
    {
        id: 11,
        title: "Blogging Application - WordPress",
        description: "An intuitive blogging application built with WordPress, offering seamless content management, customizable themes and responsive design, enabling to create and share engaging blogs effortlessly.",
        technologies: [
            "WordPress",
            "XAMPP Server",
            "MySql",
        ],
        image: "/assets/projects/word-press.png",
        visitLink: "",
        codeLink: "",
        enableVisit: false,
        enableCode: false
    },
];

export default function ProjectGrid() {
    return (
        <div>
            {/* Projects Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
                {projects.map((project, index) => (
                    <motion.div
                        key={project.id}
                        className="bg-black rounded-xl overflow-hidden flex flex-col shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{
                            scale: 1.05,
                            transition: { duration: 0.5 },
                        }}
                    >

                        <img
                            src={project.image}
                            alt={project.title}
                            className="h-48 w-full object-cover"
                        />
                        <div className="p-4 flex-1 flex flex-col justify-between">
                            <div>
                                <h3 className="text-xl text-yellow-400 font-semibold mb-2">{project.title}</h3>
                                <p className="text-gray-200 mb-4 mt-3 pl-2">{project.description}</p>

                                {/* Technologies */}
                                <div className="pb-8">
                                    <div className="flex space-x-2 py-4 overflow-x-auto">
                                        {project.technologies.map((tech, index) => (
                                            <div
                                                key={index}
                                                className="bg-yellow-400 text-black px-3 py-1 rounded-lg shadow-md whitespace-nowrap font-semibold"
                                            >
                                                {tech}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </div>
                            <div className="flex space-x-4 mt-auto">
                                <a
                                    href={project.enableVisit ? project.visitLink : undefined}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex items-center justify-center gap-2 flex-1 font-bold py-2 px-4 rounded-xl text-center
                                        ${project.enableVisit
                                            ? "bg-amber-500 hover:bg-amber-600 text-black cursor-pointer"
                                            : "bg-gray-400 text-gray-700 cursor-not-allowed pointer-events-none"
                                        }`}
                                >
                                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-black bg-opacity-20">
                                        <FiGlobe size={16} strokeWidth={2} className="text-white" />
                                    </span>
                                    Visit
                                </a>
                                <a
                                    href={project.enableCode ? project.codeLink : undefined}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex items-center justify-center gap-2 flex-1 font-bold py-2 px-4 rounded-xl text-center
                                        ${project.enableVisit
                                            ? "bg-amber-500 hover:bg-amber-600 text-black cursor-pointer"
                                            : "bg-gray-400 text-gray-700 cursor-not-allowed pointer-events-none"
                                        }`}                                >
                                    <div className="bg-black p-1 rounded-full">
                                        <Github strokeWidth={3} className="w-4 h-4 text-white font-bold" />
                                    </div>
                                    Code
                                </a>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
