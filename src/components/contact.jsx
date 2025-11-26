// import { useState } from 'react';
// import emailjs from '@emailjs/browser';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const GetInTouch = () => {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [subject, setSubject] = useState('');
//     const [message, setMessage] = useState('');
//     const [status, setStatus] = useState('');
//     const [loading, setLoading] = useState(false);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);

//         try {
//             await emailjs.send(
//                 'service_d0cr3bi',
//                 'template_std4189',
//                 {
//                     user_name: name,
//                     user_email: email,
//                     subject: subject,
//                     message: message
//                 },
//                 '5Bj6e-jf0JfYMF5Z9'
//             );
//             setStatus('Thank you for reaching out to me...');
//             toast.success('Message sent successfully!');

//             // Clear input fields on success
//             setName('');
//             setEmail('');
//             setSubject('');
//             setMessage('');

//         } catch (error) {
//             console.error(error);
//             setStatus('Failed to send message. Please try again.');
//             toast.error('Failed to send message.');

//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className='pt-30 lg:pt-30 pb-10 lg:pb-20'>
//             <div
//                 className="relative min-h-screen bg-cover bg-center ransition-all duration-1500"
//                 style={{ backgroundImage: "url('/assets/contact.jpg')" }}
//             >
//                 {/* Overlay a semi-transparent layer above the background image but below the content. */}
//                 <div className="absolute inset-0 bg-black/60"></div>

//                 <div className="relative z-10 min-h-screen flex flex-col items-center justify-center">
//                     <div className="max-w-2xl w-full p-8">

//                         <div>
//                             <h2 className="text-3xl font-bold text-white text-center">
//                                 Get In Touch
//                             </h2>
//                             <div className="w-48 h-1 bg-cyan-500 mt-2 rounded mx-auto"></div>
//                         </div>


//                         <p className="text-gray-200 text-sm font-semibold mt-8 mb-8 text-center lg:px-16 pt-4 lg:pt-0">
//                             Have a project in mind or simply wish to get in touch?
//                             <br />
//                             Feel free to send me a message! Whether it's a quick chat or a detailed discussion, I would love to hear from you.
//                         </p>

//                         <form onSubmit={handleSubmit} className="space-y-5">
//                             <div className='pt-4'>
//                                 <label className="block text-sm font-bold text-white">Full Name : </label>
//                                 <input
//                                     type="text"
//                                     value={name}
//                                     onChange={(e) => setName(e.target.value)}
//                                     required
//                                     placeholder="Enter your name"
//                                     className="mt-1 w-full px-4 py-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:ring-0 focus:border-blue-500 text-white"
//                                 />
//                             </div>

//                             <div className='pt-4'>
//                                 <label className="block text-sm font-bold text-white">Email Address : </label>
//                                 <input
//                                     type="email"
//                                     value={email}
//                                     onChange={(e) => setEmail(e.target.value)}
//                                     required
//                                     placeholder="example@email.com"
//                                     className="mt-1 w-full px-4 py-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:ring-0 focus:border-blue-500 text-white"

//                                 />
//                             </div>

//                             <div className='pt-4'>
//                                 <label className="block text-sm font-bold text-white">Subject : </label>
//                                 <input
//                                     type="text"
//                                     value={subject}
//                                     onChange={(e) => setSubject(e.target.value)}
//                                     required
//                                     placeholder="Subject of your message"
//                                     className="mt-1 w-full px-4 py-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:ring-0 focus:border-blue-500 text-white"

//                                 />
//                             </div>

//                             <div className='pt-4 pb-4'>
//                                 <label className="block text-sm font-bold text-white">Message : </label>
//                                 <textarea
//                                     rows={4}
//                                     value={message}
//                                     onChange={(e) => setMessage(e.target.value)}
//                                     required
//                                     placeholder="Type your message here..."
//                                     className="mt-1 w-full px-4 py-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:ring-0 focus:border-blue-500 text-white"

//                                 />
//                             </div>

//                             <div className="flex justify-center pt-6 md:pt-0">
//                                 <button
//                                     type="submit"
//                                     disabled={loading}
//                                     className="max-w-2xs w-full bg-transparent border-4 border-cyan-500 text-cyan-500 font-bold py-2 rounded-md shadow-md hover:bg-cyan-500 hover:text-white transition-colors duration-1000"
//                                 >
//                                     {loading ? 'Sending...' : 'Send Message'}
//                                 </button>
//                             </div>

//                             {status && <p className="text-center text-sm mt-8 text-green-600">{status}</p>}
//                         </form>
//                     </div>
//                 </div>
//                 <ToastContainer />
//             </div>
//         </div>
//     );
// };

// export default GetInTouch;
