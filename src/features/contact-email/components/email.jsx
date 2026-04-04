import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GetInTouch = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await emailjs.send(
                'service_d0cr3bi',
                'template_std4189',
                {
                    user_name: name,
                    user_email: email,
                    subject: subject,
                    message: message
                },
                '5Bj6e-jf0JfYMF5Z9'
            );
            setStatus('Thank you for reaching out to me...');
            toast.success('Message sent successfully!');

            // Clear input fields on success
            setName('');
            setEmail('');
            setSubject('');
            setMessage('');

        } catch (error) {
            console.error(error);
            setStatus('Failed to send message. Please try again.');
            toast.error('Failed to send message.');

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className=''>
            <div
                className="relative min-h-screen bg-cover bg-center ransition-all duration-1500"
                style={{ backgroundImage: "url('/assets/contact.jpg')" }}
            >
                {/* Overlay a semi-transparent layer above the background image but below the content. */}
                <div className="absolute inset-0 bg-black/60"></div>

                <div className="relative z-10 min-h-screen flex flex-col items-center justify-center pt-32 pb-20 lg:pt-32 lg:pb-32">
                    <div className="max-w-2xl w-full p-8">

                        <div className="text-center">
                            <h2 className="text-4xl font-bold text-white tracking-wide drop-shadow-lg">Get In Touch</h2>
                            <div className="w-60 h-1 bg-cyan-500 mt-3 rounded-full mx-auto shadow-[0_0_15px_rgba(0,255,255,0.6)]"></div>
                        </div>

                        <p className="text-gray-300 text-base font-medium leading-relaxed mt-8 mb-16 text-center lg:px-20">
                            Have an idea or need help building something?<br />
                            Whether it's a quick chat or a detailed discussion, reach out anytime—I’m always open to meaningful conversations.
                        </p>


                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className='pt-4'>
                                <label className="block text-sm font-bold text-white">Full Name : </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    placeholder="Enter your name"
                                    className="mt-1 w-full px-4 py-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:ring-0 focus:border-blue-500 text-white"
                                />
                            </div>

                            <div className='pt-4'>
                                <label className="block text-sm font-bold text-white">Email Address : </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="example@email.com"
                                    className="mt-1 w-full px-4 py-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:ring-0 focus:border-blue-500 text-white"

                                />
                            </div>

                            <div className='pt-4'>
                                <label className="block text-sm font-bold text-white">Subject : </label>
                                <input
                                    type="text"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    required
                                    placeholder="Subject of your message"
                                    className="mt-1 w-full px-4 py-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:ring-0 focus:border-blue-500 text-white"

                                />
                            </div>

                            <div className='pt-4 pb-4'>
                                <label className="block text-sm font-bold text-white">Message : </label>
                                <textarea
                                    rows={4}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    required
                                    placeholder="Type your message here..."
                                    className="mt-1 w-full px-4 py-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:ring-0 focus:border-blue-500 text-white"

                                />
                            </div>

                            <div className="flex justify-center pt-6">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="max-w-xs w-full py-3 font-semibold rounded-xl border-2 border-cyan-500 text-cyan-400 bg-black shadow-[0_0_20px_rgba(0,255,255,0.25)] hover:bg-cyan-500 hover:text-black hover:shadow-[0_0_35px_rgba(0,255,255,0.6)] hover:-translate-y-1 transition-all duration-500 active:scale-95 disabled:opacity-50"
                                >
                                    {loading ? 'Sending...' : 'Send Message'}
                                </button>
                            </div>

                            {status && <p className="text-center text-sm mt-8 text-green-600">{status}</p>}
                        </form>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </div>
    );
};

export default GetInTouch;
