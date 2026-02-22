import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaArrowRight, FaImages } from 'react-icons/fa';
import API_URL from '../config';

const GallerySection = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const res = await axios.get(`${API_URL}/api/gallery`);
                // Only take the latest 3 items for the home page preview
                setItems(res.data.slice(0, 3));
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch gallery for home page', error);
                setLoading(false);
            }
        };
        fetchGallery();
    }, []);

    if (loading || items.length === 0) return null;

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">Latest Memories</h2>
                    <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-4"></div>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Capturing the moments that matter. Explore our latest events, convocations, and student life.
                    </p>
                </motion.div>

                <div className="flex flex-wrap justify-center gap-8 mb-12">
                    {items.map((item, index) => (
                        <motion.div
                            key={item._id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 group"
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
                                    Explore More <FaArrowRight />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center">
                    <Link
                        to="/gallery"
                        className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-all shadow-lg hover:shadow-primary/30"
                    >
                        View Full Gallery <FaImages />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default GallerySection;
