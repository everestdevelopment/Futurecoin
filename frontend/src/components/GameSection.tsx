
import { useState, useEffect } from 'react';
import { ArrowLeft, Zap, Wallet, Users, Trophy, Settings, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GameMain from '@/components/GameMain';
import WalletPanel from '@/components/WalletPanel';
import LeaderboardPanel from '@/components/LeaderboardPanel';
import ProfilePanel from '@/components/ProfilePanel';
import { getProfile, tap, rechargeEnergy, upgradeBoost } from '@/lib/api';

interface GameSectionProps {
  onBack: () => void;
}

type ActivePanel = 'game' | 'wallet' | 'leaderboard' | 'profile';

const GameSection = ({ onBack }: GameSectionProps) => {
  const [activePanel, setActivePanel] = useState<ActivePanel>('game');
  const [coins, setCoins] = useState(0);
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);
  const [energy, setEnergy] = useState(100);
  const [maxEnergy] = useState(100);
  const [boostLevel, setBoostLevel] = useState(0);
  const [energyRechargeCount, setEnergyRechargeCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getProfile()
      .then(res => {
        setCoins(res.user.coins);
        setLevel(res.user.level);
        setXp(res.user.xp);
        setEnergy(res.user.energy);
        setBoostLevel(res.user.boostLevel);
        setEnergyRechargeCount(res.user.energyRechargeCount || 0);
      })
      .catch(() => setError('Ma’lumotlarni olishda xatolik'))
      .finally(() => setLoading(false));
  }, []);

  const handleCoinTap = async () => {
    try {
      const res = await tap();
      setCoins(res.coins);
      setXp(res.xp);
      setLevel(res.level);
      setEnergy(res.energy);
    } catch (err) {
      setError('Energiya yetarli emas yoki server xatosi');
    }
  };

  const handleBoostUpgrade = async () => {
    try {
      const res = await upgradeBoost();
      setBoostLevel(res.boostLevel);
      setCoins(res.coins);
    } catch (err) {
      setError('Boost oshirishda xatolik');
    }
  };

  const handleEnergyRecharge = async () => {
    try {
      const res = await rechargeEnergy();
      setEnergy(res.energy);
      setEnergyRechargeCount(res.energyRechargeCount);
    } catch (err) {
      setError('Energiya to‘ldirishda xatolik yoki limit tugagan');
    }
  };

  const canUseEnergyRecharge = energyRechargeCount < 3;

  const [boostEnergyStep, setBoostEnergyStep] = useState(0); // 0: 1000, 1: 1500, 2: 2000
  const boostEnergyCosts = [1000, 1500, 2000, 2500, 3000, 4000, 5000, 7000, 10000, 15000, 20000, 30000, 40000, 50000, 70000, 100000, 150000, 200000, 300000, 500000];

  const handleBoostEnergy = () => {
    const step = Math.min(boostEnergyStep, boostEnergyCosts.length - 1);
    const cost = boostEnergyCosts[step];
    if (coins >= cost) {
      setCoins(prev => prev - cost);
      setEnergy(prev => Math.min(prev + 500, maxEnergy));
      setBoostEnergyStep(prev => prev + 1);
    }
  };
  const canUseBoostEnergy = coins >= boostEnergyCosts[Math.min(boostEnergyStep, boostEnergyCosts.length - 1)];

  // Level mukofotlari (1-20 lvl)
  const levelRewards = [0, 2000, 5000, 7000, 10000, 25000, 50000, 70000, 100000, 200000, 500000, 700000, 1000000, 1500000, 2000000, 3000000, 4000000, 5000000, 7000000, 10000000, 15000000];

  const renderActivePanel = () => {
    switch (activePanel) {
      case 'game':
        return (
          <GameMain
            coins={coins}
            level={level}
            xp={xp}
            energy={energy}
            maxEnergy={maxEnergy}
            onCoinTap={handleCoinTap}
            onBoostTap={() => {}} // No direct boost tap in this component, handled by API
            onBoostUpgrade={handleBoostUpgrade}
            onEnergyRecharge={handleEnergyRecharge}
            canUseEnergyRecharge={canUseEnergyRecharge}
            energyRechargeCount={energyRechargeCount}
            boostLevel={boostLevel}
            onBoostEnergy={handleBoostEnergy}
            canUseBoostEnergy={canUseBoostEnergy}
            boostEnergyCost={boostEnergyCosts[Math.min(boostEnergyStep, boostEnergyCosts.length - 1)]}
          />
        );
      case 'wallet':
        return <WalletPanel coins={coins} />;
      case 'leaderboard':
        return <LeaderboardPanel userCoins={coins} userLevel={level} />;
      case 'profile':
        return <ProfilePanel coins={coins} level={level} xp={xp} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-dark-future text-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-card/50 backdrop-blur-sm border-b border-neon-cyan/20">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="text-neon-cyan"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Orqaga
        </Button>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-gradient-to-r from-neon-cyan/20 to-neon-purple/20 px-4 py-2 rounded-full">
            <Zap className="w-4 h-4 text-neon-cyan" />
            <span className="font-bold">{coins.toLocaleString()}</span>
          </div>
          
          <div className="flex items-center space-x-2 bg-gradient-to-r from-neon-purple/20 to-pink-500/20 px-4 py-2 rounded-full">
            <Star className="w-4 h-4 text-neon-purple" />
            <span className="font-bold">Lvl {level}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-neon-cyan">Yuklanmoqda...</p>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full text-red-500">
            <p>{error}</p>
          </div>
        ) : (
          renderActivePanel()
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="bg-card/80 backdrop-blur-sm border-t border-neon-cyan/20 p-4">
        <div className="grid grid-cols-4 gap-2 max-w-md mx-auto">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setActivePanel('game')}
            className={`${activePanel === 'game' ? 'text-neon-cyan' : 'text-gray-subtle'} w-14 h-14 flex items-center justify-center group`}
            tabIndex={0}
          >
            <span className="w-12 h-12 flex items-center justify-center rounded-full transition-all duration-200">
              <Zap className={`w-6 h-6 ${activePanel === 'game' ? 'text-neon-cyan' : 'text-gray-subtle'}`} />
            </span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setActivePanel('wallet')}
            className={`${activePanel === 'wallet' ? 'text-neon-cyan' : 'text-gray-subtle'} w-14 h-14 flex items-center justify-center group`}
            tabIndex={0}
          >
            <span className="w-12 h-12 flex items-center justify-center rounded-full transition-all duration-200">
              <Wallet className={`w-6 h-6 ${activePanel === 'wallet' ? 'text-neon-cyan' : 'text-gray-subtle'}`} />
            </span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setActivePanel('leaderboard')}
            className={`${activePanel === 'leaderboard' ? 'text-neon-cyan' : 'text-gray-subtle'} w-14 h-14 flex items-center justify-center group`}
            tabIndex={0}
          >
            <span className="w-12 h-12 flex items-center justify-center rounded-full transition-all duration-200">
              <Trophy className={`w-6 h-6 ${activePanel === 'leaderboard' ? 'text-neon-cyan' : 'text-gray-subtle'}`} />
            </span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setActivePanel('profile')}
            className={`${activePanel === 'profile' ? 'text-neon-cyan' : 'text-gray-subtle'} w-14 h-14 flex items-center justify-center group`}
            tabIndex={0}
          >
            <span className="w-12 h-12 flex items-center justify-center rounded-full transition-all duration-200">
              <Settings className={`w-6 h-6 ${activePanel === 'profile' ? 'text-neon-cyan' : 'text-gray-subtle'}`} />
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GameSection;
