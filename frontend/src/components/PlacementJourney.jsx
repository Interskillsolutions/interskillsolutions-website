import { FaUserGraduate, FaChalkboardTeacher, FaLaptopCode, FaFileAlt, FaHandshake, FaBriefcase } from 'react-icons/fa';
import { motion } from 'framer-motion';

const PlacementJourney = () => {
    const steps = [
        { icon: <FaUserGraduate />, title: "Enrollment", desc: "Register for your desired course and kickstart your career journey." },
        { icon: <FaChalkboardTeacher />, title: "Training", desc: "Learn from industry experts with hands-on practical sessions." },
        { icon: <FaLaptopCode />, title: "Live Projects", desc: "Work on real-world projects to build a strong portfolio." },
        { icon: <FaFileAlt />, title: "Resume Building", desc: "Craft a professional resume that stands out to recruiters." },
        { icon: <FaHandshake />, title: "Mock Interviews", desc: "Practice with experts to crack interviews with confidence." },
        { icon: <FaBriefcase />, title: "Land Your Dream Job", desc: "Get placed in top companies and start your professional career." },
    ];

    return (
        <div className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
                    >
                        Your Placement Journey
                    </motion.h2>
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: 100 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="h-1.5 bg-accent mx-auto rounded-full"
                    ></motion.div>
                </div>

                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-100 hidden md:block"></div>

                    <div className="space-y-12 md:space-y-0">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                viewport={{ once: true, margin: "-100px" }}
                                className={`flex flex-col md:flex-row items-center ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
                            >
                                <div className="md:w-1/2 flex justify-center md:justify-end px-8">
                                    <div className={`bg-white p-6 rounded-2xl shadow-xl border-t-4 border-primary w-full md:w-96 relative z-10 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'} text-center`}>
                                        <h3 className="text-2xl font-bold text-gray-800 mb-2">{step.title}</h3>
                                        <p className="text-gray-600">{step.desc}</p>

                                        {/* Connector Dot for Mobile */}
                                        <div className="md:hidden absolute -top-10 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white z-20">
                                            {index + 1}
                                        </div>
                                    </div>
                                </div>

                                <div className="relative flex items-center justify-center w-16 my-4 md:my-0">
                                    {/* Central Icon */}
                                    <motion.div
                                        whileHover={{ scale: 1.2, rotate: 360 }}
                                        transition={{ duration: 0.5 }}
                                        className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full flex items-center justify-center text-white text-2xl shadow-lg z-20 border-4 border-white"
                                    >
                                        {step.icon}
                                    </motion.div>
                                </div>

                                <div className="md:w-1/2 px-8 hidden md:block">
                                    {/* Empty space for alternating layout */}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlacementJourney;
