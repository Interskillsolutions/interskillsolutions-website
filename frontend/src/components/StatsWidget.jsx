import { useRef, useEffect } from 'react';
import { motion, useInView, useSpring, useTransform, useMotionValue } from 'framer-motion';

const Counter = ({ value, label }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-50px" });
    const motionValue = useMotionValue(0);
    // Increased stiffness and reduced damping for faster animation
    const springValue = useSpring(motionValue, { damping: 30, stiffness: 200 });

    const numericValue = parseInt(value.replace(/[^0-9]/g, ''));
    const suffix = value.replace(/[0-9]/g, '');

    useEffect(() => {
        if (inView) {
            motionValue.set(numericValue);
        }
    }, [inView, numericValue, motionValue]);

    const displayValue = useTransform(springValue, (latest) => {
        return `${Math.floor(latest)}${suffix}`;
    });

    return (
        <div ref={ref} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
            <motion.h3 className="text-5xl font-extrabold text-primary mb-2 flex justify-center">
                <motion.span>{displayValue}</motion.span>
            </motion.h3>
            <p className="text-gray-600 font-semibold text-lg uppercase tracking-wide">{label}</p>
        </div>
    );
};

const StatsWidget = () => {
    const stats = [
        { label: 'Placed Students', value: '12000+' },
        { label: 'Alumni Network', value: '1500+' },
        { label: 'Industry Expert Trainers', value: '100+' },
        { label: 'Years Experience', value: '25+' },
    ];

    return (
        <div className="bg-gradient-to-b from-white to-gray-50 py-20">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {stats.map((stat, index) => (
                        <Counter key={index} value={stat.value} label={stat.label} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StatsWidget;
