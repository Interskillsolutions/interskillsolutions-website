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
    const [activeCategory, setActiveCategory] = useState(null);

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
            if (Object.keys(orderedCategories).length > 0) {
                setActiveCategory(Object.keys(orderedCategories)[0]);
            }
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
                                Services <FaChevronDown className="ml-1 text-xs" />
                            </button>


                            {/* Compact Mega Menu V4 */}
                            <div className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 w-[600px] bg-white rounded-xl shadow-xl border border-gray-100 invisible opacity-0 group-hover/dropdown:visible group-hover/dropdown:opacity-100 transition-all duration-200 origin-top z-50 overflow-hidden">
                                {Object.keys(categories).length === 0 ? (
                                    <div className="p-6 text-center text-gray-400 text-sm">Loading...</div>
                                ) : (
                                    <div className="flex bg-white min-h-[300px]">
                                        {/* Sidebar - Categories */}
                                        <div className="w-[35%] bg-gray-50/80 border-r border-gray-100 py-3">
                                            {Object.keys(categories).map((category) => (
                                                <button
                                                    key={category}
                                                    onMouseEnter={() => setActiveCategory(category)}
                                                    className={`w-full text-left px-5 py-2.5 text-[13px] font-semibold flex items-center justify-between transition-colors ${activeCategory === category
                                                        ? 'text-primary bg-white shadow-sm border-r-2 border-primary'
                                                        : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
                                                        }`}
                                                >
                                                    {category}
                                                    {activeCategory === category && <FaChevronRight className="text-[10px] text-primary" />}
                                                </button>
                                            ))}
                                            <div className="mt-2 px-5 pt-3 border-t border-gray-100">
                                                <Link to="/courses" className="text-[11px] font-bold text-gray-400 hover:text-primary uppercase tracking-wider flex items-center gap-1">
                                                    View All Services <FaChevronRight className="text-[9px]" />
                                                </Link>
                                            </div>
                                        </div>

                                        {/* Content - Compact Course Grid */}
                                        <div className="w-[65%] p-5 bg-white">
                                            <AnimatePresence mode='wait'>
                                                {activeCategory && categories[activeCategory] && (
                                                    <motion.div
                                                        key={activeCategory}
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        exit={{ opacity: 0 }}
                                                        transition={{ duration: 0.15 }}
                                                    >
                                                        <div className="mb-4 pb-2 border-b border-gray-50 flex justify-between items-center">
                                                            <h3 className="text-sm font-bold text-gray-800 tracking-tight">
                                                                {activeCategory}
                                                            </h3>
                                                            <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-medium">
                                                                {categories[activeCategory].length}
                                                            </span>
                                                        </div>

                                                        <div className="grid grid-cols-1 gap-2">
                                                            {categories[activeCategory].map(course => (
                                                                <Link
                                                                    key={course._id}
                                                                    to={`/courses/${course._id}`}
                                                                    className="group flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100"
                                                                >
                                                                    <div className="w-8 h-8 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                                                                        <FaBook className="text-xs" />
                                                                    </div>
                                                                    <div className="flex-1 min-w-0">
                                                                        <h4 className="text-[13px] font-medium text-gray-700 group-hover:text-primary truncate transition-colors">
                                                                            {course.title}
                                                                        </h4>
                                                                    </div>
                                                                    <FaChevronRight className="text-[10px] text-gray-300 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                )}
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
                                        Services <FaChevronDown className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
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
                                            <Link to="/courses" className="block text-primary font-bold mt-2 pt-2 border-t" onClick={toggleMenu}>View All Services</Link>
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
