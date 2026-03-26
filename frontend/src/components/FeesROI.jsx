import { motion } from 'framer-motion';

const FeesROI = () => {
    return (
        <section className="py-24 bg-[#05070A]" id="fees">
            <div className="container mx-auto px-4">
                <div className="glass-card p-12 relative overflow-hidden max-w-5xl mx-auto">
                    {/* Background Effects */}
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent"></div>
                    
                    <div className="flex flex-col lg:flex-row items-center gap-16 relative z-10">
                        <div className="lg:w-1/2">
                            <h2 className="text-4xl md:text-5xl font-black mb-6 text-white leading-tight">
                                Investment That <br />
                                <span className="gradient-text">Pays for Itself</span>
                            </h2>
                            <p className="text-gray-400 text-lg mb-8">
                                Why pay for a degree when your internship can cover the costs? 
                                Our program is designed to deliver maximum ROI from Year 2.
                            </p>
                            
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl font-bold">✓</div>
                                    <div>
                                        <h4 className="text-white font-bold">Guaranteed Stipend</h4>
                                        <p className="text-sm text-gray-500">Earn ₹8,000–₹12,000 per month during internships.</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl font-bold">✓</div>
                                    <div>
                                        <h4 className="text-white font-bold">Placement Support</h4>
                                        <p className="text-sm text-gray-500">Access to our network of 500+ hiring partners.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:w-1/2 w-full">
                            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 relative">
                                <span className="absolute -top-4 -right-4 bg-primary text-[#05070A] px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/20">Value Analysis</span>
                                
                                <div className="space-y-8">
                                    <div>
                                        <div className="flex justify-between mb-2">
                                            <span className="text-gray-400">Total Program Fees</span>
                                            <span className="text-white font-bold">₹3,50,000</span>
                                        </div>
                                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                            <motion.div 
                                                initial={{ width: 0 }}
                                                whileInView={{ width: "100%" }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1 }}
                                                className="h-full bg-gray-600"
                                            ></motion.div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex justify-between mb-2">
                                            <span className="text-primary font-bold">Internship Earnings (2 Years)</span>
                                            <span className="text-primary font-bold">- ₹2,40,000</span>
                                        </div>
                                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                            <motion.div 
                                                initial={{ width: 0 }}
                                                whileInView={{ width: "70%" }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1.5, delay: 0.5 }}
                                                className="h-full bg-primary shadow-[0_0_10px_var(--primary-glow)]"
                                            ></motion.div>
                                        </div>
                                        <p className="text-[10px] text-gray-500 mt-2 uppercase tracking-widest font-bold">Calculation: Avg. ₹10k/mo × 24 months</p>
                                    </div>

                                    <div className="pt-6 border-t border-white/10 text-center">
                                        <p className="text-gray-400 text-sm mb-1 uppercase tracking-widest">Effective Net Fees</p>
                                        <h3 className="text-6xl font-black text-white glow-text">₹1,10,000</h3>
                                        <p className="text-primary text-xs mt-2 font-bold animate-pulse">Almost Zero Net Cost with Early Career Placement!</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeesROI;
