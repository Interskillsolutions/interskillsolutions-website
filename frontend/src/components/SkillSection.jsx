import { motion } from 'framer-motion';
import publicSpeakingImg from '../assets/public_speaking_1764884028354.png';
import programmingImg from '../assets/programming_lab_1764884053028.png';
import interviewImg from '../assets/mock_interview_1764884075981.png';

const SkillSection = () => {
    const skills = [
        {
            title: 'Public Speaking',
            desc: 'Master the art of communication and build confidence.',
            image: publicSpeakingImg,
            color: 'bg-blue-50',
            iconColor: 'text-blue-600'
        },
        {
            title: 'Programming Excellence',
            desc: 'Hands-on coding experience in modern labs.',
            image: programmingImg,
            color: 'bg-green-50',
            iconColor: 'text-green-600'
        },
        {
            title: 'Interview Training',
            desc: 'Mock interviews with industry experts to get you job-ready.',
            image: interviewImg,
            color: 'bg-purple-50',
            iconColor: 'text-purple-600'
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <div className="py-24 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
                    >
                        Holistic Skill Development
                    </motion.h2>
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: 100 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="h-1.5 bg-accent mx-auto rounded-full"
                    ></motion.div>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-10"
                >
                    {skills.map((skill, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ y: -10, transition: { duration: 0.3 } }}
                            className="bg-white rounded-2xl shadow-xl overflow-hidden group cursor-pointer"
                        >
                            <div className="relative overflow-hidden h-56">
                                <motion.img
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.5 }}
                                    src={skill.image}
                                    alt={skill.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                            </div>
                            <div className={`p-8 ${skill.color} h-full`}>
                                <h3 className={`text-2xl font-bold mb-3 ${skill.iconColor}`}>{skill.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{skill.desc}</p>
                                <div className="mt-6 flex items-center text-gray-800 font-semibold group-hover:translate-x-2 transition-transform">
                                    Learn More
                                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default SkillSection;
