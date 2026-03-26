import { motion } from 'framer-motion';

const steps = [
    {
        year: "YEAR 1",
        title: "Foundation",
        topics: ["Programming (C / Python)", "Mathematics & Statistics", "Database Basics", "Computer Fundamentals", "Soft Skills"],
        badge: "Building the Core"
    },
    {
        year: "YEAR 2",
        title: "Core + Internship",
        topics: ["Data Structures", "Operating Systems", "Computer Networks", "Web Programming", "Internship Preparation"],
        badge: "₹8k–12k/month Stipend",
        highlight: true
    },
    {
        year: "YEAR 3",
        title: "Advanced + Placement",
        topics: ["AI / Cyber Security / Cloud", "Software Engineering", "Final Capstone Projects", "Corporate Grooming", "100% Placement"],
        badge: "Industry Ready"
    }
];

const SemesterRoadmap = () => {
    return (
        <section className="py-24 mesh-bg relative" id="roadmap">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="section-heading"
                    >
                        Your <span className="gradient-text">Career Roadmap</span>
                    </motion.h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        A structured 3-year journey from foundation to high-paying placement.
                    </p>
                </div>

                <div className="relative max-w-4xl mx-auto">
                    {/* Progress Line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gradient-to-b from-primary via-secondary to-primary/20 hidden md:block opacity-30"></div>

                    <div className="space-y-12 md:space-y-24">
                        {steps.map((step, index) => (
                            <motion.div 
                                key={index}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6 }}
                                className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
                            >
                                {/* Roadmap Content */}
                                <div className="md:w-1/2 w-full text-center md:text-left">
                                    <div className={`glass-card p-8 relative overflow-hidden ${step.highlight ? 'neon-border' : ''}`}>
                                        <div className="absolute top-4 right-4 text-xs font-black text-primary/30 tracking-tighter scale-150 origin-right opacity-20">{step.year}</div>
                                        
                                        <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 ${step.highlight ? 'bg-primary text-[#05070A]' : 'bg-white/10 text-primary'}`}>
                                            {step.badge}
                                        </span>
                                        
                                        <h3 className="text-3xl font-bold mb-4 text-white">{step.title}</h3>
                                        
                                        <ul className="space-y-3">
                                            {step.topics.map((topic, i) => (
                                                <li key={i} className="flex items-center text-gray-400 gap-3 text-sm">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-primary/60"></span>
                                                    {topic}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Roadmap Indicator */}
                                <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-[#05070A] border-4 border-gray-800 rounded-full flex items-center justify-center z-10 hidden md:flex">
                                    <div className="w-4 h-4 rounded-full bg-primary shadow-[0_0_15px_var(--primary-glow)]"></div>
                                </div>

                                {/* Placeholder for balance */}
                                <div className="md:w-1/2 hidden md:block"></div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SemesterRoadmap;
