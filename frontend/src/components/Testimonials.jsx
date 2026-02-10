import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaStar, FaUserCircle, FaLinkedin } from 'react-icons/fa';
import API_URL from '../config';

const ReadMoreLess = ({ text, limit }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleReadMore = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <span>
            "{isExpanded ? text : text.substring(0, limit) + '...'}"
            <button
                onClick={toggleReadMore}
                className="text-blue-500 hover:text-blue-700 font-semibold ml-2 focus:outline-none"
            >
                {isExpanded ? 'Read Less' : 'Read More'}
            </button>
        </span>
    );
};

const Testimonials = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const { data } = await axios.get(`${API_URL}/api/reviews`);
                setReviews(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching reviews:', error);
                setLoading(false);
            }
        };
        fetchReviews();
    }, []);

    if (loading) return null; // Or a subtle skeleton loader

    if (reviews.length === 0) return null;

    return (
        <section className="py-20 bg-gray-50 overflow-hidden">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">Success Stories</h2>
                    <div className="w-24 h-1 bg-accent mx-auto rounded-full mb-4"></div>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Hear from our students who have transformed their careers with Interskill Solutions.
                    </p>
                </motion.div>

                {/* Simplified Grid Layout for Stability - Masonry-like feel */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {reviews.map((review, index) => (
                        <motion.div
                            key={review._id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 relative hover:shadow-xl transition-shadow"
                        >
                            <FaQuoteLeft className="text-4xl text-blue-100 absolute top-6 left-6 -z-0" />

                            <div className="relative z-10">
                                <div className="text-gray-600 mb-6 leading-relaxed italic">
                                    {review.review.length > 200 ? (
                                        <ReadMoreLess text={review.review} limit={200} />
                                    ) : (
                                        review.review
                                    )}
                                </div>

                                <div className="flex items-center gap-4 border-t pt-6 border-gray-100">
                                    {review.image ? (
                                        <img src={review.image} alt={review.name} className="w-12 h-12 rounded-full object-cover shadow-sm" />
                                    ) : (
                                        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-primary text-xl">
                                            <FaUserCircle />
                                        </div>
                                    )}

                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h4 className="font-bold text-gray-800">{review.name}</h4>
                                            {review.socialLink && (
                                                <a href={review.socialLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition-colors">
                                                    <FaLinkedin />
                                                </a>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-500">{review.role}</p>
                                    </div>

                                    <div className="ml-auto flex text-yellow-400 text-sm">
                                        {[...Array(review.rating)].map((_, i) => (
                                            <FaStar key={i} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
