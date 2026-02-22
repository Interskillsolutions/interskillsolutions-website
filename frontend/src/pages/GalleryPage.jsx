import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaArrowRight } from 'react-icons/fa';
import API_URL from '../config';

const GalleryPage = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const res = await axios.get(`${API_URL}/api/gallery`);
                setItems(res.data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch gallery', error);
                setLoading(false);
            }
        };
        fetchGallery();
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    return (
        <div className="pt-24 pb-20 min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-primary py-16 mb-12">
                <div className="container mx-auto px-4 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold text-white mb-4"
                    >
                        Our Gallery
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-blue-100 max-w-2xl mx-auto text-lg"
                    >
                        Explore the vibrant life at Interskill Solutions. From tech convocations to hands-on workshops and student success stories.
                    </motion.p>
                </div>
            </div>

            <div className="container mx-auto px-4">
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                    </div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {items.map((item) => (
                            <motion.div
                                key={item._id}
                                variants={itemVariants}
                                whileHover={{ y: -10 }}
                                className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 group"
                            >
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src={item.featuredImage}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary flex items-center shadow-lg">
                                        <FaCalendarAlt className="mr-2" />
                                        {new Date(item.eventDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                        <p className="text-white text-sm font-medium">Click to view full story</p>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2 truncate group-hover:text-primary transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-600 mb-6 line-clamp-2 text-sm leading-relaxed">
                                        {item.description}
                                    </p>
                                    <Link
                                        to={`/gallery/${item._id}`}
                                        className="inline-flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all"
                                    >
                                        See More <FaArrowRight />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}

                        {items.length === 0 && (
                            <div className="col-span-full py-20 text-center">
                                <h3 className="text-2xl text-gray-400">No events found in our gallery yet.</h3>
                                <p className="text-gray-500 mt-2">Check back soon for latest updates!</p>
                            </div>
                        )}
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default GalleryPage;
