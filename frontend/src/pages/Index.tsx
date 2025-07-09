
import { useState } from 'react';
import HeroSection from '@/components/HeroSection';
import GameSection from '@/components/GameSection';
import HowItWorks from '@/components/HowItWorks';
import Benefits from '@/components/Benefits';
import Statistics from '@/components/Statistics';
import Testimonials from '@/components/Testimonials';
import Tokenomics from '@/components/Tokenomics';
import HowToClaim from '@/components/HowToClaim';
import FinalCTA from '@/components/FinalCTA';

const Index = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);

  if (isGameStarted) {
    return (
      <div className="min-h-screen bg-dark-future text-white overflow-x-hidden">
        <GameSection onBack={() => setIsGameStarted(false)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-future text-white overflow-x-hidden">
      <HeroSection onStartGame={() => setIsGameStarted(true)} />
      <HowItWorks />
      <Benefits />
      <Statistics />
      <Testimonials />
      <Tokenomics />
      <HowToClaim />
      <FinalCTA />
    </div>
  );
};

export default Index;
