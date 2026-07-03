import Hero from '../features/home/components/Hero';
import FleetPreview from '../features/home/components/FleetPreview';
import WhyDriveNova from '../features/home/components/WhyDriveNova';
import LuxuryExperience from '../features/home/components/LuxuryExperience';
import Testimonials from '../features/home/components/Testimonials';
import FinalCTA from '../features/home/components/FinalCTA';

export default function Home() {
  return (
    <div className="relative w-full bg-[#0a0a0a] text-white">
      <Hero />
      <FleetPreview />
      <WhyDriveNova />
      <LuxuryExperience />
      <Testimonials />
      <FinalCTA />
    </div>
  );
}


