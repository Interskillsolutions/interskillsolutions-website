import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import API_URL from '../config';

const DualDegreeHero = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_URL}/api/leads`, {
                ...formData,
                source: 'Consultation',
                interest: 'Dual Degree Program'
            });
            alert('Consultation booked successfully!');
            setFormData({ name: '', email: '', phone: '' });
        } catch (error) {
            alert('Failed to book consultation. Please try again.');
        }
    };

    return (
        <div className="relative min-h-[90vh] flex items-center overflow-hidden mesh-bg pt-20">
            {/* Animated Glow Orbs */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[150px] animate-pulse delay-700"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    {/* Content Left */}
                    <div className="lg:w-3/5 text-center lg:text-left">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="inline-block px-4 py-1.5 mb-6 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-bold tracking-widest uppercase backdrop-blur-sm"
                        >
                            🚀 The Future of Education is Here
                        </motion.div>
                        
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-[1.1] tracking-tight"
                        >
                            Build Your Career with <br />
                            <span className="gradient-text">Dual Degree + </span> <br />
                            Industry Skills
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-xl md:text-2xl mb-10 text-gray-400 max-w-2xl leading-relaxed"
                        >
                            <span className="text-white font-semibold">BSc IT/CS or BCA</span> combined with 
                            <span className="text-primary font-semibold"> High-End Specialization</span>. 
                            Get guaranteed internship & placement support.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                        >
                            <button className="btn-primary flex items-center justify-center gap-2">
                                Apply Now <span>→</span>
                            </button>
                            <button className="btn-secondary">
                                Book Free Demo
                            </button>
                        </motion.div>

                        {/* Trust Badges */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1, duration: 1 }}
                            className="mt-12 flex flex-wrap justify-center lg:justify-start gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500"
                        >
                            <div className="flex items-center gap-2">
                                <span className="text-2xl font-bold font-outfit">100%</span>
                                <span className="text-xs uppercase tracking-wider">Placement <br />Assistance</span>
                            </div>
                            <div className="w-px h-10 bg-white/10"></div>
                            <div className="flex items-center gap-2">
                                <span className="text-2xl font-bold font-outfit">UGC</span>
                                <span className="text-xs uppercase tracking-wider">Recognized <br />Degrees</span>
                            </div>
                            <div className="w-px h-10 bg-white/10"></div>
                            <div className="flex items-center gap-2">
                                <span className="text-2xl font-bold font-outfit">8k–12k</span>
                                <span className="text-xs uppercase tracking-wider">Internship <br />Stipend</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Lead Form Right */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="lg:w-2/5 w-full max-w-md"
                    >
                        <div className="glass-card p-8 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            
                            <h2 className="text-2xl font-bold mb-2 text-white relative z-10 font-outfit">Start Your Journey</h2>
                            <p className="text-gray-400 mb-8 relative z-10">Get a Free Career Consultation Session</p>
                            
                            <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                                <div>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Full Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl focus:border-primary/50 focus:ring-1 focus:ring-primary/50 text-white transition-all outline-none"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email Address"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl focus:border-primary/50 focus:ring-1 focus:ring-primary/50 text-white transition-all outline-none"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="tel"
                                        name="phone"
                                        pattern="[0-9]{10}"
                                        placeholder="Phone Number"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl focus:border-primary/50 focus:ring-1 focus:ring-primary/50 text-white transition-all outline-none"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full py-4 bg-primary text-[#05070A] font-bold rounded-xl hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    Get Free Consultation
                                </button>
                            </form>
                            
                            <p className="mt-6 text-center text-xs text-gray-500">
                                By clicking, you agree to our <span className="underline cursor-pointer">Privacy Policy</span>
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Bottom Gradient Fade */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#05070A] to-transparent z-10"></div>
        </div>
    );
};

export default DualDegreeHero;
