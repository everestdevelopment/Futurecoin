
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

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Index = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const { user, loading, login, error } = useAuth();
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState<'phone' | 'code'>('phone');
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const sendCode = async () => {
    setSending(true);
    setLoginError(null);
    try {
      const res = await fetch(`${API_URL}/auth/send-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Kod yuborilmadi');
      setStep('code');
    } catch (err: any) {
      setLoginError(err.message);
    } finally {
      setSending(false);
    }
  };

  const verifyCode = async () => {
    setVerifying(true);
    setLoginError(null);
    try {
      const res = await fetch(`${API_URL}/auth/verify-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, code })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Kod noto‘g‘ri');
      localStorage.setItem('token', data.token);
      window.location.reload();
    } catch (err: any) {
      setLoginError(err.message);
    } finally {
      setVerifying(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Yuklanmoqda...</div>;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-future text-white">
        <div className="bg-card p-8 rounded-xl shadow-xl w-full max-w-sm space-y-6">
          <h2 className="text-2xl font-bold mb-4">Telefon raqam orqali kirish</h2>
          {step === 'phone' && (
            <>
              <input
                className="w-full p-2 rounded bg-dark-future border border-neon-cyan mb-2"
                placeholder="Telefon raqam (998901234567)"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                disabled={sending}
              />
              <button
                className="w-full bg-neon-cyan text-dark-future font-bold py-2 rounded hover:bg-neon-purple transition"
                onClick={sendCode}
                disabled={!phone || sending}
              >
                {sending ? 'Kod yuborilmoqda...' : 'Kod yuborish'}
              </button>
            </>
          )}
          {step === 'code' && (
            <>
              <input
                className="w-full p-2 rounded bg-dark-future border border-neon-cyan mb-2"
                placeholder="SMS kod (6 xonali)"
                value={code}
                onChange={e => setCode(e.target.value)}
                disabled={verifying}
              />
              <button
                className="w-full bg-neon-cyan text-dark-future font-bold py-2 rounded hover:bg-neon-purple transition"
                onClick={verifyCode}
                disabled={!code || verifying}
              >
                {verifying ? 'Tekshirilmoqda...' : 'Kodni tasdiqlash'}
              </button>
            </>
          )}
          {loginError && <div className="text-red-500 text-sm">{loginError}</div>}
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
