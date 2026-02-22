import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaArrowLeft, FaImages } from 'react-icons/fa';
import API_URL from '../config';

const GalleryDetail = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const res = await axios.get(`${API_URL}/api/gallery/${id}`);
                setItem(res.data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch item', error);
                setLoading(false);
            }
        };
        fetchItem();
        window.scrollTo(0, 0);
    }, [id]);

    if (loading) return (
        <div className="pt-32 pb-20 flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
    );

    if (!item) return (
        <div className="pt-32 pb-20 text-center min-h-screen">
            <h2 className="text-2xl font-bold">Event not found</h2>
            <Link to="/gallery" className="text-primary mt-4 inline-block">Back to Gallery</Link>
        </div>
    );

    const allImages = [item.featuredImage, ...(item.images || [])];

    return (
        <div className="pt-24 pb-20 min-h-screen bg-white">
            <div className="container mx-auto px-4">
                {/* Back Button */}
                <Link to="/gallery" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary mb-8 transition-colors group">
                    <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Gallery
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Story Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <div className="flex items-center gap-3 text-primary font-semibold mb-3 uppercase tracking-widest text-sm">
                            <FaCalendarAlt />
                            {new Date(item.eventDate).toLocaleDateString('en-US', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                            })}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                            {item.title}
                        </h1>
                        <div className="prose prose-lg text-gray-600 max-w-none whitespace-pre-wrap">
                            {item.story || item.description}
                        </div>
                    </motion.div>

                    {/* Image Grid Side */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="space-y-6"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                <FaImages className="text-primary" /> Event Highlights
                            </h3>
                            <span className="text-sm font-medium text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                                {allImages.length} Photos
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {allImages.map((img, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ scale: 1.02 }}
                                    className={`relative rounded-xl overflow-hidden shadow-lg cursor-pointer border-2 border-transparent hover:border-primary transition-all ${index === 0 ? 'col-span-2 h-80' : 'h-48'}`}
                                    onClick={() => setSelectedImage(img)}
                                >
                                    <img
                                        src={img}
                                        alt={`Event photo ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                    {index === 0 && (
                                        <div className="absolute top-4 right-4 bg-primary text-white text-xs px-2 py-1 rounded font-bold uppercase tracking-wider">
                                            Main Photo
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Lightbox / Modal for Image Preview */}
            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black/95 z-[60] flex items-center justify-center p-4 backdrop-blur-md"
                    onClick={() => setSelectedImage(null)}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="relative max-w-5xl max-h-[90vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute -top-12 right-0 text-white text-3xl font-light hover:text-gray-300"
                            onClick={() => setSelectedImage(null)}
                        >
                            &times; Close
                        </button>
                        <img
                            src={selectedImage}
                            alt="Preview"
                            className="w-full h-auto max-h-[80vh] object-contain rounded-lg shadow-2xl"
                        />
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default GalleryDetail;
