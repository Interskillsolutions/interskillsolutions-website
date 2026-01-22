import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaChevronDown, FaChevronRight, FaLayerGroup, FaBook, FaGraduationCap } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import API_URL from '../config';
import BrochurePopup from './BrochurePopup';
import logoIcon from '../assets/only_logo.jpg';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isBrochureOpen, setIsBrochureOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Dynamic Course Data
    const [courses, setCourses] = useState([]);
    const [categories, setCategories] = useState({});

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);

        fetchCourses();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const fetchCourses = async () => {
        try {
            const [coursesRes, categoriesRes] = await Promise.all([
                axios.get(`${API_URL}/api/courses`),
                axios.get(`${API_URL}/api/categories`)
            ]);

            const coursesData = coursesRes.data;
            const categoriesData = categoriesRes.data; // Already sorted by priority from backend

            setCourses(coursesData);

            // Group courses by category name
            const grouped = {};
            coursesData.forEach(course => {
                const cat = course.category || 'Other';
                if (!grouped[cat]) grouped[cat] = [];
                grouped[cat].push(course);
            });

            // Create an ordered object based on fetched categories
            const orderedCategories = {};

            // First, add defined categories in order
            categoriesData.forEach(cat => {
                if (grouped[cat.name]) {
                    orderedCategories[cat.name] = grouped[cat.name];
                    delete grouped[cat.name]; // Remove from grouped to avoid duplicates
                }
            });

            // Add remaining (Others or undefined categories) at the end
            Object.keys(grouped).forEach(cat => {
                orderedCategories[cat] = grouped[cat];
            });

            setCategories(orderedCategories);
        } catch (error) {
            console.error("Failed to fetch data for navbar", error);
        }
    };

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
                className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-primary/95 backdrop-blur-md shadow-lg py-2' : 'bg-primary shadow-md py-4'}`}
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

                        <div className="relative group/dropdown">
                            <button
                                className="flex items-center text-gray-300 hover:text-white focus:outline-none transition-colors py-2"
                                onMouseEnter={() => setDropdownOpen(true)}
                            >
                                Courses <FaChevronDown className="ml-1 text-xs" />
                            </button>

                            {/* Desktop Dropdown */}
                            <div className="absolute left-0 mt-0 w-72 bg-white border border-gray-100 rounded-xl shadow-2xl py-2 invisible opacity-0 group-hover/dropdown:visible group-hover/dropdown:opacity-100 transition-all duration-300 transform origin-top-left z-50">
                                {Object.keys(categories).length === 0 ? (
                                    <div className="px-4 py-2 text-gray-500 text-sm">Loading courses...</div>
                                ) : (
                                    Object.entries(categories).map(([category, catCourses]) => (
                                        <div key={category} className="group/item relative">
                                            <button className="w-full text-left px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-primary transition-colors flex justify-between items-center group-hover/item:bg-blue-50 group-hover/item:text-primary">
                                                <span className="flex items-center gap-3 font-medium">
                                                    <FaGraduationCap className="text-gray-400 group-hover/item:text-primary transition-colors" />
                                                    {category}
                                                </span>
                                                <FaChevronRight className="text-xs text-gray-400 group-hover/item:text-primary transition-colors" />
                                            </button>

                                            {/* Nested Sub-menu */}
                                            <div className="absolute left-full top-0 w-72 bg-white border border-gray-100 rounded-xl shadow-2xl py-2 invisible opacity-0 group-hover/item:visible group-hover/item:opacity-100 transition-all duration-200 -ml-2">
                                                <div className="px-4 py-2 border-b border-gray-50 mb-1">
                                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{category} Courses</span>
                                                </div>
                                                {catCourses.map(course => (
                                                    <Link
                                                        key={course._id}
                                                        to={`/courses/${course._id}`}
                                                        className="block px-4 py-2.5 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 flex items-center gap-3 transition-colors"
                                                    >
                                                        <FaBook className="text-blue-200 group-hover:text-primary transition-colors text-xs" />
                                                        {course.title}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    ))
                                )}
                                <div className="border-t border-gray-100 mt-2 pt-2">
                                    <Link to="/courses" className="block px-4 py-2 text-center text-sm font-semibold text-primary hover:text-blue-700">
                                        View All Courses →
                                    </Link>
                                </div>
                            </div>
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
                                            {/* Mobile Dynamic Courses */}
                                            {Object.entries(categories).map(([category, catCourses]) => (
                                                <div key={category} className="mb-2">
                                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 mt-2">{category}</p>
                                                    {catCourses.map(course => (
                                                        <Link
                                                            key={course._id}
                                                            to={`/courses/${course._id}`}
                                                            className="block text-gray-600 hover:text-primary py-1 pl-2 text-sm border-l border-gray-200 hover:border-primary"
                                                            onClick={toggleMenu}
                                                        >
                                                            {course.title}
                                                        </Link>
                                                    ))}
                                                </div>
                                            ))}
                                            <Link to="/courses" className="block text-primary font-bold mt-2 pt-2 border-t" onClick={toggleMenu}>View All Courses</Link>
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
