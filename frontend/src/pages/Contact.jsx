import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted:', formData);
        alert("Thank you for contacting us! We'll get back to you soon.");
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-32 left-20 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>

            <motion.div
                className="max-w-7xl mx-auto relative z-10"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div className="text-center mb-16" variants={itemVariants}>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 mb-4">
                        Get in Touch
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        We'd love to hear from you. Whether you have a question about our courses, need assistance, or just want to say hi, our team is here to help.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8">
                    {/* Contact Information */}
                    <motion.div
                        className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20"
                        variants={itemVariants}
                    >
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h2>
                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <div className="bg-indigo-100 p-3 rounded-full text-indigo-600">
                                    <FaPhone className="text-xl" />
                                </div>
                                <div className="w-full">
                                    <h3 className="font-semibold text-gray-800">Phone</h3>
                                    <div className="flex flex-col sm:flex-row sm:justify-between w-full pr-4">
                                        <div>
                                            <span className="text-sm text-gray-500 block">Thane Branch:</span>
                                            <a href="tel:9819461050" className="block text-gray-600 hover:text-indigo-600 transition-colors font-medium">98194 61050</a>
                                        </div>
                                        <div className="mt-2 sm:mt-0">
                                            <span className="text-sm text-gray-500 block">Andheri Branch:</span>
                                            <a href="tel:9136264656" className="block text-gray-600 hover:text-indigo-600 transition-colors font-medium">91362 64656</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="bg-purple-100 p-3 rounded-full text-purple-600">
                                    <FaEnvelope className="text-xl" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-800">Email</h3>
                                    <a href="mailto:info@interskillsolutions.com" className="block text-gray-600 hover:text-purple-600 transition-colors">info@interskillsolutions.com</a>
                                    <a href="mailto:placements@interskillsolutions.com" className="block text-gray-600 hover:text-purple-600 transition-colors">placements@interskillsolutions.com</a>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="bg-pink-100 p-3 rounded-full text-pink-600">
                                    <FaMapMarkerAlt className="text-xl" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-800 mb-1">Thane Location</h3>
                                    <p className="text-gray-600 text-sm mb-3">505, 5th floor, Paradise Tower, Station Rd, Naupada, Thane West 400602</p>

                                    <h3 className="font-semibold text-gray-800 mb-1">Andheri Location</h3>
                                    <p className="text-gray-600 text-sm">Office No.14, Ground Floor, S.V. Road, Andheri West 400058</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12">
                            <h3 className="font-semibold text-gray-800 mb-4">Follow Us</h3>
                            <div className="flex space-x-4">
                                <a href="https://www.facebook.com/interskillsolutionsthane/" target="_blank" rel="noopener noreferrer" className="bg-gray-100 p-3 rounded-full text-gray-600 hover:bg-blue-600 hover:text-white transition-all transform hover:scale-110">
                                    <FaFacebookF />
                                </a>
                                <a href="https://www.linkedin.com/company/interskillsolutions/" target="_blank" rel="noopener noreferrer" className="bg-gray-100 p-3 rounded-full text-gray-600 hover:bg-blue-700 hover:text-white transition-all transform hover:scale-110">
                                    <FaLinkedinIn />
                                </a>
                                <a href="https://www.instagram.com/interskill_solutions_institute/" target="_blank" rel="noopener noreferrer" className="bg-gray-100 p-3 rounded-full text-gray-600 hover:bg-pink-600 hover:text-white transition-all transform hover:scale-110">
                                    <FaInstagram />
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        className="bg-white rounded-2xl p-8 shadow-2xl relative"
                        variants={itemVariants}
                    >
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                                        placeholder="Amit Singh"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                                        placeholder="amit.singh@example.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                                    placeholder="How can we help?"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="4"
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 outline-none transition-all resize-none"
                                    placeholder="Write your message here..."
                                    required
                                ></textarea>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2"
                            >
                                <span>Send Message</span>
                                <FaPaperPlane className="text-sm" />
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default Contact;
