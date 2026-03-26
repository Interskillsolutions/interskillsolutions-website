import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DualDegreeHero from '../components/DualDegreeHero';
import DualAdvantage from '../components/DualAdvantage';
import ProgramSection from '../components/ProgramSection';
import SemesterRoadmap from '../components/SemesterRoadmap';
import FeesROI from '../components/FeesROI';
import DualDegreePartners from '../components/DualDegreePartners';
import Testimonials from '../components/Testimonials';
import GallerySection from '../components/GallerySection';
import '../styles/DualDegree.css';

const DualDegree = () => {
    return (
        <div className="dual-degree-page bg-[#05070A] min-h-screen text-white">
            <DualDegreeHero />
            <DualAdvantage />
            <ProgramSection />
            <SemesterRoadmap />
            <FeesROI />
            <DualDegreePartners />
            <GallerySection />
            <Testimonials />
        </div>
    );
};

export default DualDegree;
