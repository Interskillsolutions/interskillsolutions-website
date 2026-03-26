import { motion } from 'framer-motion';

const DualAdvantage = () => {
    return (
        <section className="py-24 mesh-bg relative" id="advantage">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="section-heading"
                    >
                        The <span className="gradient-text">Dual Degree</span> Advantage
                    </motion.h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Don’t just get a degree. Get Hired. Our unique structure ensures 
                        you graduate with more than just a piece of paper.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        {
                            title: "Graduation Degree",
                            subtitle: "BSc IT/CS or BCA",
                            desc: "University regular degree recognized by UGC for higher studies and govt jobs.",
                            icon: "🎓"
                        },
                        {
                            title: "Industry Skills",
                            subtitle: "Specialize in AI/Cyber",
                            desc: "Master skills that the industry actually needs. Move beyond outdated syllabus.",
                            icon: "⚡"
                        },
                        {
                            title: "Work Experience",
                            subtitle: "2 Years Internship",
                            desc: "Graduate with a massive headstart. Gain real-world corporate experience while studying.",
                            icon: "💼"
                        },
                        {
                            title: "Personality Plus",
                            subtitle: "Interview Ready",
                            desc: "Soft skills, corporate grooming, and interview training included in the curriculum.",
                            icon: "🧠"
                        }
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-card p-8 text-center"
                        >
                            <div className="text-4xl mb-6">{item.icon}</div>
                            <h3 className="text-white font-bold text-xl mb-1">{item.title}</h3>
                            <p className="text-primary text-xs font-bold uppercase tracking-widest mb-4">{item.subtitle}</p>
                            <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-20 glass-card p-10 flex flex-col md:flex-row items-center justify-between gap-8 neon-border">
                    <div className="text-center md:text-left">
                        <h3 className="text-3xl font-bold text-white mb-2">Ready to transform your future?</h3>
                        <p className="text-gray-400">Join our next batch and start your journey towards a high-growth career.</p>
                    </div>
                    <button className="btn-primary whitespace-nowrap">
                        Book Your Seat Now
                    </button>
                </div>
            </div>
        </section>
    );
};

export default DualAdvantage;
