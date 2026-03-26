import { motion } from 'framer-motion';
import { FaDatabase, FaShieldAlt, FaCode, FaBrain, FaCloud, FaUserSecret } from 'react-icons/fa';

const programs = [
    {
        id: 1,
        title: "Data Science with AI & ML",
        icon: <FaDatabase />,
        color: "from-blue-500 to-cyan-400",
        overview: "Data Science combines statistics, programming, and AI to extract insights and solve real-world problems.",
        topics: ["Data Analytics & Visualization", "Machine Learning (ML)", "Artificial Intelligence (AI)", "Deep Learning", "NLP", "Python Programming", "AI & Robotics"],
        careers: ["Data Scientist", "Data Analyst", "ML Engineer", "AI Engineer", "BI Analyst"]
    },
    {
        id: 2,
        title: "Cyber Security",
        icon: <FaShieldAlt />,
        color: "from-red-600 to-orange-500",
        overview: "Cyber Security protects systems, networks, and data from digital attacks.",
        topics: ["Ethical Hacking", "Penetration Testing", "Network Security", "Cryptography", "Risk Management", "Threat Analysis"],
        careers: ["Security Analyst", "Ethical Hacker", "Security Consultant", "Network Security Engineer", "Cloud Security Specialist"]
    },
    {
        id: 3,
        title: "Full Stack Development",
        icon: <FaCode />,
        color: "from-green-500 to-emerald-400",
        overview: "Learn to build complete web applications from frontend to backend.",
        topics: ["HTML/CSS/JS", "React JS", "Node.js & Express", "MongoDB", "APIs & Auth", "Git & Deployment"],
        careers: ["Frontend Developer", "Backend Developer", "Full Stack Developer", "Web App Developer"]
    },
    {
        id: 4,
        title: "Artificial Intelligence",
        icon: <FaBrain />,
        color: "from-purple-600 to-pink-500",
        overview: "Master the foundations and advanced concepts of AI and Neural Networks.",
        topics: ["AI Fundamentals", "Machine Learning", "Neural Networks", "Deep Learning", "Computer Vision", "NLP"],
        careers: ["AI Engineer", "Research Analyst", "Automation Engineer"]
    },
    {
        id: 5,
        title: "Cloud Computing & Linux",
        icon: <FaCloud />,
        color: "from-cyan-600 to-blue-500",
        overview: "Learn cloud infrastructure management and Linux server administration.",
        topics: ["Linux Administration", "Cloud Platforms (AWS)", "Server Management", "DevOps Basics"],
        careers: ["Cloud Engineer", "DevOps Engineer", "System Administrator"]
    },
    {
        id: 6,
        title: "Ethical Hacking & IT Security",
        icon: <FaUserSecret />,
        color: "from-gray-700 to-black",
        overview: "Gain expertise in offensive security and digital forensics.",
        topics: ["Ethical Hacking", "Network Penetration", "Security Testing", "Digital Forensics"],
        careers: ["Ethical Hacker", "Security Tester", "Cyber Forensics Expert"]
    }
];

const ProgramSection = () => {
    return (
        <section className="py-24 bg-[#05070A] relative overflow-hidden" id="programs">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="section-heading"
                    >
                        Our <span className="gradient-text">Elite Programs</span>
                    </motion.h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Choose a specialization that aligns with your career goals. 
                        Each program is designed with top industry experts.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {programs.map((program, index) => (
                        <motion.div
                            key={program.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-card glass-card-hover p-8 group relative overflow-hidden"
                        >
                            {/* Accent Glow */}
                            <div className={`absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br ${program.color} opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition-opacity`}></div>
                            
                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${program.color} flex items-center justify-center text-white text-2xl mb-6 shadow-lg shadow-black/20`}>
                                {program.icon}
                            </div>

                            <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-primary transition-colors">
                                {program.title}
                            </h3>
                            
                            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                                {program.overview}
                            </p>

                            <div className="space-y-4">
                                <div>
                                    <h4 className="text-xs uppercase tracking-widest text-primary font-bold mb-2">Key Topics</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {program.topics.slice(0, 4).map((topic, i) => (
                                            <span key={i} className="text-[10px] px-2 py-1 rounded-md bg-white/5 border border-white/10 text-gray-300">
                                                {topic}
                                            </span>
                                        ))}
                                        {program.topics.length > 4 && (
                                            <span className="text-[10px] px-2 py-1 text-primary">+{program.topics.length - 4} more</span>
                                        )}
                                    </div>
                                </div>
                                
                                <div className="pt-4 border-t border-white/5">
                                    <h4 className="text-xs uppercase tracking-widest text-secondary font-bold mb-2">Career Roles</h4>
                                    <p className="text-xs text-gray-500 italic">
                                        {program.careers.join(", ")}
                                    </p>
                                </div>
                            </div>

                            <button className="mt-8 w-full py-3 rounded-xl border border-white/10 text-white font-semibold group-hover:bg-primary group-hover:text-[#05070A] group-hover:border-primary transition-all duration-300">
                                View Full Syllabus
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProgramSection;
