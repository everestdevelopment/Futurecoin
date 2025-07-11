
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
import { useAuth } from '@/hooks/useAuth';
import { getProfile } from '@/lib/api';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Index = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  // Remove all auth and login logic

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
