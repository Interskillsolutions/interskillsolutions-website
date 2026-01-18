import Hero from '../components/Hero';
import StatsWidget from '../components/StatsWidget';
import VisionMission from '../components/VisionMission';
import PlacementJourney from '../components/PlacementJourney';
import SkillSection from '../components/SkillSection';
import PlacementPartners from '../components/PlacementPartners';
import Testimonials from '../components/Testimonials';

const Home = () => {
    return (
        <div>
            <Hero />
            <StatsWidget />
            <VisionMission />
            <SkillSection />
            <PlacementJourney />
            <PlacementPartners />
            <Testimonials />
        </div>
    );
};

export default Home;
