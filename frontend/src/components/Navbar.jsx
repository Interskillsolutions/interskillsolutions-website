import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import BrochurePopup from './BrochurePopup';
import logoIcon from '../assets/only_logo.jpg';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isBrochureOpen, setIsBrochureOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    const navLinkVariants = {
        hover: { scale: 1.05, color: '#ffc107' },
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-primary/95 backdrop-blur-md shadow-lg py-2' : 'bg-primary shadow-md py-4'
                    }`}
            >
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <Link to="/" className="flex items-center space-x-3 group">
                        <span className={`font-bold text-white tracking-tight transition-all duration-300 ${scrolled ? 'text-xl' : 'text-2xl'}`}>
                            InterSkill Solutions
                        </span>
                        <motion.img
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.8 }}
                            src={logoIcon}
                            alt="InterSkill Solutions"
                            className={`transition-all duration-300 ${scrolled ? 'h-10' : 'h-12'}`}
                        />
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8 items-center font-medium">
                        <motion.div whileHover="hover" variants={navLinkVariants}>
                            <Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
                        </motion.div>

                        <div className="relative" onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
                            <button className="flex items-center text-gray-300 hover:text-white focus:outline-none transition-colors">
                                Courses <FaChevronDown className={`ml-1 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                            </button>
                            <AnimatePresence>
                                {dropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute left-0 mt-2 w-56 bg-white border rounded-xl shadow-xl py-2 overflow-hidden"
                                    >
                                        <Link to="/courses/data-science" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-primary transition-colors">
                                            Data Science <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full ml-2">Hot</span>
                                        </Link>
                                        <Link to="/courses/full-stack" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-primary transition-colors">
                                            Full Stack Dev <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full ml-2">New</span>
                                        </Link>
                                        <div className="border-t my-1"></div>
                                        <Link to="/courses" className="block px-4 py-3 text-primary font-semibold hover:bg-blue-50 transition-colors">View All Courses →</Link>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <motion.div whileHover="hover" variants={navLinkVariants}>
                            <Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link>
                        </motion.div>
                        <motion.div whileHover="hover" variants={navLinkVariants}>
                            <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link>
                        </motion.div>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsBrochureOpen(true)}
                            className="bg-primary text-white px-6 py-2.5 rounded-full shadow-lg hover:bg-blue-700 transition-colors font-semibold"
                        >
                            Download Brochure
                        </motion.button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button onClick={toggleMenu} className="text-white focus:outline-none p-2">
                            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="md:hidden bg-white border-t overflow-hidden"
                        >
                            <div className="px-4 py-4 space-y-4">
                                <Link to="/" className="block text-gray-700 hover:text-primary font-medium" onClick={toggleMenu}>Home</Link>
                                <div>
                                    <button onClick={toggleDropdown} className="flex justify-between w-full text-gray-700 hover:text-primary font-medium">
                                        Courses <FaChevronDown className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                                    </button>
                                    {dropdownOpen && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="pl-4 mt-2 space-y-2 border-l-2 border-blue-100 ml-2"
                                        >
                                            <Link to="/courses/data-science" className="block text-gray-600 hover:text-primary" onClick={toggleMenu}>Data Science</Link>
                                            <Link to="/courses/full-stack" className="block text-gray-600 hover:text-primary" onClick={toggleMenu}>Full Stack Dev</Link>
                                            <Link to="/courses" className="block text-primary font-semibold" onClick={toggleMenu}>View All</Link>
                                        </motion.div>
                                    )}
                                </div>
                                <Link to="/about" className="block text-gray-700 hover:text-primary font-medium" onClick={toggleMenu}>About Us</Link>
                                <Link to="/contact" className="block text-gray-700 hover:text-primary font-medium" onClick={toggleMenu}>Contact</Link>
                                <button
                                    onClick={() => { setIsBrochureOpen(true); toggleMenu(); }}
                                    className="w-full bg-primary text-white py-3 rounded-lg shadow hover:bg-blue-700 transition-colors font-semibold"
                                >
                                    Download Brochure
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>
            <BrochurePopup isOpen={isBrochureOpen} onClose={() => setIsBrochureOpen(false)} />
        </>
    );
};

export default Navbar;
