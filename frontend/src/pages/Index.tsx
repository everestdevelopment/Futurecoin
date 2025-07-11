
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

const Index = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const { user, loading, login, error } = useAuth();
  const [tgId, setTgId] = useState('');
  const [username, setUsername] = useState('');
  const [referralBy, setReferralBy] = useState('');

  if (loading) return <div className="min-h-screen flex items-center justify-center">Yuklanmoqda...</div>;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-future text-white">
        <div className="bg-card p-8 rounded-xl shadow-xl w-full max-w-sm space-y-6">
          <h2 className="text-2xl font-bold mb-4">Telegram orqali kirish</h2>
          <input
            className="w-full p-2 rounded bg-dark-future border border-neon-cyan mb-2"
            placeholder="Telegram ID"
            value={tgId}
            onChange={e => setTgId(e.target.value)}
          />
          <input
            className="w-full p-2 rounded bg-dark-future border border-neon-cyan mb-2"
            placeholder="Username (ixtiyoriy)"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <input
            className="w-full p-2 rounded bg-dark-future border border-neon-cyan mb-2"
            placeholder="Referral (ixtiyoriy)"
            value={referralBy}
            onChange={e => setReferralBy(e.target.value)}
          />
          <button
            className="w-full bg-neon-cyan text-dark-future font-bold py-2 rounded hover:bg-neon-purple transition"
            onClick={() => login(tgId, username, referralBy)}
            disabled={!tgId}
          >
            Kirish
          </button>
          {error && <div className="text-red-500 text-sm">{error}</div>}
        </div>
      </div>
    );
  }

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
