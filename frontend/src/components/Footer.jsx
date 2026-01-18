import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';
import logoBlue from '../assets/logo_blue_cropped.png';

const Footer = () => {
    const footerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, staggerChildren: 0.1 }
        }
    };

    return (
        <footer className="bg-gray-900 text-white pt-16 pb-8 border-t border-gray-800">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={footerVariants}
                className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12"
            >
                <motion.div variants={footerVariants}>
                    <img src={logoBlue} alt="InterSkill Solutions" className="h-20 mb-6 rounded-lg bg-white p-2" />
                    <p className="text-gray-400 leading-relaxed">
                        Bridging the gap between industry expectations and aspiring professionals with expert training and mentorship.
                    </p>
                </motion.div>

                <motion.div variants={footerVariants}>
                    <h3 className="text-xl font-bold mb-6 text-accent">Quick Links</h3>
                    <ul className="space-y-3">
                        {['Home', 'Courses', 'About Us', 'Contact'].map((item) => (
                            <li key={item}>
                                <a
                                    href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                                    className="text-gray-400 hover:text-white hover:translate-x-2 transition-all inline-block"
                                >
                                    {item}
                                </a>
                            </li>
                        ))}
                        <li>
                            <a
                                href="/admin/login"
                                className="text-gray-400 hover:text-white hover:translate-x-2 transition-all inline-block"
                            >
                                Admin Login
                            </a>
                        </li>
                    </ul>
                </motion.div>

                <motion.div variants={footerVariants}>
                    <h3 className="text-xl font-bold mb-6 text-accent">Contact Us</h3>
                    <div className="space-y-4 text-gray-400 text-sm">
                        <div className="flex items-start">
                            <span className="mr-3 mt-1 text-lg">📍</span>
                            <div>
                                <p className="font-semibold text-white mb-1">Thane:</p>
                                <p>505, 5th floor, Paradise Tower, Station Rd, above MCDonald's, Naupada, Thane West, Thane 400602</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <span className="mr-3 mt-1 text-lg">📍</span>
                            <div>
                                <p className="font-semibold text-white mb-1">Andheri:</p>
                                <p>Office No.14, Ground Floor Opp. Moti Mehel Restaurant S.V. Road, Near Andheri Railway Station, Andheri West 400058</p>
                            </div>
                        </div>
                        <a href="mailto:interskillssolution@gmail.com" className="flex items-center hover:text-white transition-colors">
                            <span className="mr-3 text-lg">📧</span>
                            Interskillssolution@gmail.com
                        </a>
                        <a href="tel:9819461050" className="flex items-center hover:text-white transition-colors">
                            <span className="mr-3 text-lg">📞</span>
                            9819461050
                        </a>
                    </div>
                </motion.div>

                <motion.div variants={footerVariants}>
                    <h3 className="text-xl font-bold mb-6 text-accent">Follow Us</h3>
                    <div className="flex space-x-4">
                        <motion.a whileHover={{ scale: 1.2, rotate: 5 }} href="https://www.facebook.com/interskillsolutionsthane/" target="_blank" rel="noopener noreferrer" className="bg-gray-800 p-3 rounded-full text-gray-400 hover:text-white hover:bg-primary transition-colors">
                            <FaFacebook size={20} />
                        </motion.a>
                        <motion.a whileHover={{ scale: 1.2, rotate: 5 }} href="https://www.instagram.com/interskill_solutions_institute/" target="_blank" rel="noopener noreferrer" className="bg-gray-800 p-3 rounded-full text-gray-400 hover:text-white hover:bg-primary transition-colors">
                            <FaInstagram size={20} />
                        </motion.a>
                        <motion.a whileHover={{ scale: 1.2, rotate: 5 }} href="https://www.linkedin.com/company/interskillsolutions/" target="_blank" rel="noopener noreferrer" className="bg-gray-800 p-3 rounded-full text-gray-400 hover:text-white hover:bg-primary transition-colors">
                            <FaLinkedin size={20} />
                        </motion.a>
                    </div>
                </motion.div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center mt-12 pt-8 border-t border-gray-800 text-gray-500 text-sm"
            >
                &copy; {new Date().getFullYear()} InterSkill Solutions. All rights reserved.
            </motion.div>

            <motion.a
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="https://wa.me/919876543210"
                className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors z-50 flex items-center justify-center"
                target="_blank"
                rel="noopener noreferrer"
            >
                <FaWhatsapp size={32} />
            </motion.a>
        </footer>
    );
};

export default Footer;
