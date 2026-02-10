import React, { useEffect, useState } from 'react';
import API_URL from '../config';
import { motion } from 'framer-motion';

const PlacementPartners = () => {
    const [partners, setPartners] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPartners = async () => {
            try {
                const res = await fetch(`${API_URL}/api/partners`);
                const data = await res.json();
                setPartners(data);
                setLoading(false);
            } catch (err) {
                console.error('Failed to fetch/load partners', err);
                setLoading(false);
            }
        };

        fetchPartners();
    }, []);

    if (loading || partners.length === 0) return null;

    // Create a loop of partners for the marquee
    const MARQUEE_ITEMS = [...partners, ...partners, ...partners, ...partners]; // Repeat more to ensure smooth scroll if few items

    return (
        <section className="py-16 bg-white overflow-hidden border-t border-b border-gray-100">
            <div className="container mx-auto px-4 mb-10 text-center">
                <h2 className="text-3xl font-bold text-gray-800">Our <span className="text-primary">Placement Partners</span></h2>
                <p className="text-gray-600 mt-2">Trusted by leading companies across the industry</p>
            </div>

            <div className="relative w-full overflow-hidden mask-gradient-sides">
                {/* Gradient Masks for fade effect */}
                <div className="absolute top-0 left-0 w-32 h-full z-10 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-32 h-full z-10 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>

                <motion.div
                    className="flex gap-12 w-max"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        duration: Math.max(20, partners.length * 5), // Adjust speed based on count
                        ease: "linear",
                        repeat: Infinity
                    }}
                >
                    {MARQUEE_ITEMS.map((partner, index) => (
                        <a
                            key={`${partner._id}-${index}`}
                            href={partner.website || '#'}
                            target={partner.website ? "_blank" : "_self"}
                            rel="noopener noreferrer"
                            className={`flex-shrink-0 flex items-center justify-center min-w-[180px] h-24 bg-gray-50 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-300 group ${partner.website ? 'cursor-pointer' : 'cursor-default'} p-4 block`}
                            onClick={(e) => !partner.website && e.preventDefault()}
                        >
                            <img
                                src={partner.logo && partner.logo.startsWith('http') ? partner.logo : `${API_URL}${partner.logo}`}
                                alt={partner.name}
                                className="max-h-full max-w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300 opacity-70 group-hover:opacity-100"
                            />
                        </a>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default PlacementPartners;
