import React, { useEffect, useState } from 'react';
import API_URL from '../config';
import { motion } from 'framer-motion';

const DualDegreePartners = () => {
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
    const MARQUEE_ITEMS = [...partners, ...partners, ...partners, ...partners];

    return (
        <section className="py-24 bg-[#05070A] overflow-hidden border-t border-white/5" id="partners">
            <div className="container mx-auto px-4 mb-16 text-center">
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="section-heading"
                >
                    Our <span className="gradient-text">Placement Partners</span>
                </motion.h2>
                <p className="text-gray-400 max-w-2xl mx-auto">Trusted by leading tech giants and global innovators.</p>
            </div>

            <div className="relative w-full overflow-hidden">
                {/* Gradient Masks */}
                <div className="absolute top-0 left-0 w-48 h-full z-10 bg-gradient-to-r from-[#05070A] to-transparent pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-48 h-full z-10 bg-gradient-to-l from-[#05070A] to-transparent pointer-events-none"></div>

                <motion.div
                    className="flex gap-16 w-max items-center"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        duration: 30,
                        ease: "linear",
                        repeat: Infinity
                    }}
                >
                    {MARQUEE_ITEMS.map((partner, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 flex items-center justify-center p-6 h-20 w-40 opacity-40 hover:opacity-100 transition-all duration-500 grayscale hover:grayscale-0"
                        >
                            <img
                                src={partner.logo && partner.logo.startsWith('http') ? partner.logo : `${API_URL}${partner.logo}`}
                                alt={partner.name}
                                className="max-h-full max-w-full object-contain filter invert brightness-200 hover:invert-0 hover:brightness-100 transition-all"
                            />
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default DualDegreePartners;
