import Hero from '../components/Hero';
import StatsWidget from '../components/StatsWidget';
import VisionMission from '../components/VisionMission';
import PlacementJourney from '../components/PlacementJourney';
import SkillSection from '../components/SkillSection';
import PlacementPartners from '../components/PlacementPartners';
import Testimonials from '../components/Testimonials';
import GallerySection from '../components/GallerySection';

const Home = () => {
    return (
        <div>
            <Hero />
            <StatsWidget />
            <VisionMission />
            <SkillSection />
            <PlacementJourney />
            <PlacementPartners />
            <GallerySection />
            <Testimonials />
        </div>
    );
};

export default Home;
