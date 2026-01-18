import React from 'react';
import { motion } from 'framer-motion';
import { FaChalkboardTeacher, FaProjectDiagram, FaUserTie, FaRocket, FaLightbulb, FaHandshake } from 'react-icons/fa';
import PlacementPartners from '../components/PlacementPartners';
import Testimonials from '../components/Testimonials';

const About = () => {
    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center bg-gray-900 text-white overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-primary/80 mix-blend-multiply"></div>
                    <motion.img
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
                        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1742&q=80"
                        alt="About Us Background"
                        className="w-full h-full object-cover opacity-50"
                    />
                </div>

                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight"
                    >
                        Bridging Industry & <span className="text-accent">Aspirations</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl text-gray-200 max-w-2xl mx-auto"
                    >
                        With over 18+ years of experience, Interskill Solutions is dedicated to empowering the next generation of professionals.
                    </motion.p>
                </div>
            </section>

            {/* Main Content: Story & Mission */}
            <section className="py-20 px-4">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Who We Are</h2>
                            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                Interskill Solutions is an <span className="font-semibold text-primary">ISO 9001:2015 certified institute</span> based in Thane, Maharashtra. We are dedicated to bridging the gap between industry expectations and aspiring professionals.
                            </p>
                            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                Founded by <span className="font-semibold text-gray-800">Dr. Priya Gawade</span> (PhD, HR expert with 25+ years’ experience), our team of seasoned trainers and mentors brings rich industry insights to help learners build practical, future-ready skills.
                            </p>
                            <p className="text-lg text-gray-600 leading-relaxed font-medium">
                                Join Interskill Solutions to secure your future with in-demand skills and become part of the next generation of industry-ready professionals.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-white p-8 rounded-2xl shadow-xl border-l-4 border-primary"
                        >
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Expertise</h3>
                            <p className="text-gray-600 mb-4">We empower individuals in diverse fields:</p>
                            <div className="flex flex-wrap gap-2 text-sm">
                                {['Full Stack Development', 'Data Science', 'AI & ML', 'Data Analytics', 'Cyber Security', 'Ethical Hacking', 'Structural Designing', 'Interior Designing', 'BIM Modelling', 'Mechanical Design'].map((skill) => (
                                    <span key={skill} className="px-3 py-1 bg-blue-50 text-primary font-medium rounded-full border border-blue-100">
                                        {skill}
                                    </span>
                                ))}
                            </div>

                            <div className="mt-8">
                                <h4 className="font-bold text-gray-800 mb-2">Industries We Serve:</h4>
                                <div className="flex flex-wrap gap-2 text-sm">
                                    {['IT', 'Banking', 'Insurance', 'Retail', 'Healthcare', 'Manufacturing'].map((ind) => (
                                        <span key={ind} className="px-2 py-1 bg-gray-100 text-gray-600 rounded">
                                            {ind}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Why Choose Us Grid */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose <span className="text-primary">InterSkill?</span></h2>
                        <div className="w-24 h-1 bg-accent mx-auto rounded-full"></div>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<FaChalkboardTeacher />}
                            title="Expert Mentors"
                            desc="Learn from industry veterans like Dr. Priya Gawade and seasoned trainers."
                        />
                        <FeatureCard
                            icon={<FaProjectDiagram />}
                            title="Live Projects"
                            desc="Work on real-time projects to build a robust portfolio that stands out."
                        />
                        <FeatureCard
                            icon={<FaUserTie />}
                            title="Placement Support"
                            desc="Dedicated career guidance, resume building, and mock interviews."
                        />
                        <FeatureCard
                            icon={<FaRocket />}
                            title="Future-Ready Skills"
                            desc="Master in-demand skills for a smooth transition into the corporate world."
                        />
                        <FeatureCard
                            icon={<FaHandshake />}
                            title="Industry Connections"
                            desc="Network with hiring partners and gain exclusive job opportunities."
                        />
                        <FeatureCard
                            icon={<FaLightbulb />}
                            title="Holistic Development"
                            desc="Focus on soft skills, logic building, and problem-solving abilities."
                        />
                    </div>
                </div>
            </section>

            {/* Vision & Mission Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto max-w-6xl px-4">
                    <div className="flex flex-col md:flex-row gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex-1 space-y-6"
                        >
                            <div className="inline-block p-3 bg-blue-100 rounded-lg text-primary mb-2">
                                <FaLightbulb size={30} />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-800">Our Mission</h2>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                To deliver quality training that makes every student <span className="font-semibold text-primary">career-ready</span> and ensures a smooth transition into the corporate world. We aim to secure your future with in-demand skills.
                            </p>
                        </motion.div>

                        <div className="hidden md:block w-px h-64 bg-gray-200"></div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex-1 space-y-6"
                        >
                            <div className="inline-block p-3 bg-yellow-100 rounded-lg text-yellow-600 mb-2">
                                <FaRocket size={30} />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-800">Our Vision</h2>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                To be the leading catalyst in transforming aspiring learners into industry-ready professionals, creating a workforce that is not only skilled but also innovative and adaptable.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            <PlacementPartners />

            <Testimonials />

            {/* Google Maps Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4 max-w-6xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-10"
                    >
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Visit Us</h2>
                        <p className="text-gray-600">Come visit our institute in Thane, Maharashtra.</p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white h-[450px]"
                    >
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d8079.664010854612!2d72.97935434846978!3d19.187354957582116!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b9dd725faa8f%3A0xddf0382f6bb4634a!2sInterskill%20Solutions%20Pvt.%20Ltd!5e1!3m2!1sen!2sin!4v1765263856700!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Interskill Solutions Location"
                        ></iframe>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

const FeatureCard = ({ icon, title, desc }) => {
    return (
        <motion.div
            whileHover={{ y: -10 }}
            className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 group"
        >
            <div className="w-14 h-14 bg-blue-50 text-primary rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
            <p className="text-gray-600 leading-relaxed">{desc}</p>
        </motion.div>
    );
};

export default About;
