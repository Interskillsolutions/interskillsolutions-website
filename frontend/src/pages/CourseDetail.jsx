import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../config';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaCheckCircle, FaClock, FaChalkboardTeacher, FaLaptopCode,
    FaDownload, FaChevronDown, FaChevronUp, FaStar, FaUserGraduate
} from 'react-icons/fa';
import BrochurePopup from '../components/BrochurePopup';

const CourseDetail = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeModule, setActiveModule] = useState(null);
    const [isBrochureOpen, setIsBrochureOpen] = useState(false);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const { data } = await axios.get(`${API_URL}/api/courses`);
                // Slug matching logic
                const foundCourse = data.find(c =>
                    c.title.toLowerCase().replace(/ /g, '-') === id ||
                    c.title.toLowerCase().includes(id.replace(/-/g, ' '))
                );
                setCourse(foundCourse);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching course:', error);
                setLoading(false);
            }
        };
        fetchCourse();
    }, [id]);

    if (loading) return (
        <div className="flex h-screen items-center justify-center bg-gray-50">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
        </div>
    );

    if (!course) return (
        <div className="flex h-screen items-center justify-center bg-gray-50">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Course Not Found</h2>
                <Link to="/courses" className="text-primary hover:underline">Browse all courses</Link>
            </div>
        </div>
    );

    const toggleModule = (index) => {
        setActiveModule(activeModule === index ? null : index);
    };

    return (
        <div className="bg-gray-50 min-h-screen pb-20 font-sans">
            {/* Hero Section */}
            <section className="relative pt-32 pb-24 overflow-hidden bg-gray-900">
                {/* Background Image & Overlay */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                    {course.image ? (
                        <motion.div
                            initial={{ scale: 1.1 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url(${course.image})` }}
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-900"></div>
                    )}
                    <div className={`absolute inset-0 bg-gray-900/85`}></div>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10 grid md:grid-cols-2 gap-12 items-center text-white">
                    <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
                        <div className="inline-block px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-semibold mb-4 border border-yellow-500/50 backdrop-blur-sm">
                            {course.category || 'Professional Certification'}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">{course.title}</h1>
                        <p className="text-lg text-gray-200 mb-8 leading-relaxed max-w-lg">{course.description}</p>

                        <div className="flex flex-wrap gap-6 text-sm font-medium text-gray-300 mb-8">
                            <div className="flex items-center"><FaClock className="mr-2 text-accent" /> {course.duration}</div>
                            <div className="flex items-center"><FaChalkboardTeacher className="mr-2 text-accent" /> {course.mode}</div>
                            <div className="flex items-center"><FaUserGraduate className="mr-2 text-accent" /> Placement Support</div>
                        </div>

                        <div className="flex gap-4">
                            <button className="bg-accent text-gray-900 px-8 py-3.5 rounded-lg font-bold hover:bg-yellow-400 transition-all shadow-lg hover:shadow-yellow-500/20 transform hover:-translate-y-1">
                                Enroll Now
                            </button>
                            <button
                                onClick={() => setIsBrochureOpen(true)}
                                className="flex items-center px-6 py-3.5 rounded-lg font-semibold border border-gray-500 hover:bg-white/10 transition-colors backdrop-blur-sm"
                            >
                                <FaDownload className="mr-2" /> Syllabus
                            </button>
                        </div>
                    </motion.div>

                    {/* Highlights Card - Glassmorphism */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="hidden md:flex justify-end"
                    >
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl shadow-2xl max-w-xs w-full text-white">
                            <h3 className="text-xl font-bold mb-6 border-b border-white/20 pb-4 flex items-center gap-2">
                                <FaStar className="text-yellow-400" /> Course Highlights
                            </h3>
                            <ul className="space-y-4">
                                {(course.highlights || ["Expert Mentorship", "Live Projects", "Certification"]).slice(0, 5).map((highlight, idx) => (
                                    <li key={idx} className="flex items-start">
                                        <FaCheckCircle className="text-green-400 mt-1 mr-3 flex-shrink-0" />
                                        <span className="font-medium text-gray-100">{highlight}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Main Content Layout */}
            <div className="container mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">

                {/* Left Column: Details */}
                <div className="lg:col-span-2 space-y-12">

                    {/* Tools & Technologies */}
                    {course.tools && course.tools.length > 0 && (
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Tools & Technologies You Will Learn</h2>
                            <div className="flex flex-wrap gap-4">
                                {course.tools.map((tool, idx) => (
                                    <span key={idx} className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-semibold text-sm border border-blue-100">
                                        {tool}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Syllabus */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Course Syllabus</h2>
                        <div className="space-y-4">
                            {course.syllabus && course.syllabus.length > 0 ? (
                                course.syllabus.map((module, index) => (
                                    <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
                                        <button
                                            onClick={() => toggleModule(index)}
                                            className="w-full flex justify-between items-center p-5 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                                        >
                                            <span className="font-bold text-gray-800 text-lg">{module.title}</span>
                                            {activeModule === index ? <FaChevronUp className="text-primary" /> : <FaChevronDown className="text-gray-400" />}
                                        </button>
                                        <AnimatePresence>
                                            {activeModule === index && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="overflow-hidden bg-white"
                                                >
                                                    <div className="p-5 border-t border-gray-100">
                                                        <ul className="grid md:grid-cols-2 gap-3">
                                                            {module.topics.map((topic, i) => (
                                                                <li key={i} className="flex items-center text-gray-600 text-sm">
                                                                    <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></div>
                                                                    {topic}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ))
                            ) : (
                                // Fallback for legacy format
                                <ul className="space-y-3">
                                    {course.curriculum && course.curriculum.map((topic, index) => (
                                        <li key={index} className="flex items-start">
                                            <FaCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                                            <span className="text-gray-700">{topic}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    {/* Key Features / Highlights Detailed */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                            <div className="bg-white w-12 h-12 rounded-lg flex items-center justify-center text-primary mb-4 shadow-sm">
                                <FaLaptopCode size={24} />
                            </div>
                            <h3 className="font-bold text-gray-800 mb-2">Hands-on Projects</h3>
                            <p className="text-sm text-gray-600">Work on real industry use-cases and build a portfolio that employers value.</p>
                        </div>
                        <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-100">
                            <div className="bg-white w-12 h-12 rounded-lg flex items-center justify-center text-yellow-600 mb-4 shadow-sm">
                                <FaUserGraduate size={24} />
                            </div>
                            <h3 className="font-bold text-gray-800 mb-2">Placement Support</h3>
                            <p className="text-sm text-gray-600">Dedicated assistance with resume building, mock interviews, and job leads.</p>
                        </div>
                    </div>

                </div>

                {/* Right Column: Sticky Sidebar */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24 space-y-8">


                        {/* Contact Widget */}
                        <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-lg">
                            <h3 className="text-xl font-bold mb-4">Have Questions?</h3>
                            <p className="text-gray-300 text-sm mb-6">Our career counselors are here to help you choose the right path.</p>
                            <button className="w-full bg-transparent border border-gray-600 text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors">
                                Request Call Back
                            </button>
                        </div>
                    </div>
                </div>

            </div>
            <BrochurePopup isOpen={isBrochureOpen} onClose={() => setIsBrochureOpen(false)} />
        </div>
    );
};

export default CourseDetail;
