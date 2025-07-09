
import { useState, useEffect } from 'react';
import { ArrowLeft, Zap, Wallet, Users, Trophy, Settings, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GameMain from '@/components/GameMain';
import WalletPanel from '@/components/WalletPanel';
import LeaderboardPanel from '@/components/LeaderboardPanel';
import ProfilePanel from '@/components/ProfilePanel';

interface GameSectionProps {
  onBack: () => void;
}

type ActivePanel = 'game' | 'wallet' | 'leaderboard' | 'profile';

const GameSection = ({ onBack }: GameSectionProps) => {
  const [activePanel, setActivePanel] = useState<ActivePanel>('game');
  const [coins, setCoins] = useState(1000);
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);
  const [energy, setEnergy] = useState(500); // 100 -> 500
  const [maxEnergy] = useState(500); // 100 -> 500
  const [boostLevel, setBoostLevel] = useState(0); // 0: normal, 1: +15, 2: +25
  
  // Energy recharge system
  const [energyRechargeCount, setEnergyRechargeCount] = useState(0);
  const [lastRechargeReset, setLastRechargeReset] = useState(Date.now());

  // Energy regeneration
  useEffect(() => {
    const interval = setInterval(() => {
      setEnergy(prev => Math.min(prev + 1, maxEnergy));
    }, 3000); // Regenerate 1 energy every 3 seconds

    return () => clearInterval(interval);
  }, [maxEnergy]);

  // Reset energy recharge count every 5 hours
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const fiveHours = 5 * 60 * 60 * 1000; // 5 hours in milliseconds
      
      if (now - lastRechargeReset >= fiveHours) {
        setEnergyRechargeCount(0);
        setLastRechargeReset(now);
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [lastRechargeReset]);

  // Level up logic
  useEffect(() => {
    const xpNeeded = level * 100;
    if (xp >= xpNeeded) {
      setLevel(prev => prev + 1);
      setXp(prev => prev - xpNeeded);
      // Mukofot berish
      const nextLevel = level + 1;
      if (nextLevel <= 20) {
        setCoins(prev => prev + levelRewards[nextLevel]);
      }
    }
  }, [xp, level]);

  const handleCoinTap = () => {
    if (energy > 0) {
      const baseCoins = level * 10;
      const boostBonus = boostLevel === 1 ? 15 : boostLevel === 2 ? 25 : 0;
      const totalCoins = baseCoins + boostBonus;
      const xpEarned = 5;
      
      setCoins(prev => prev + totalCoins);
      setXp(prev => prev + xpEarned);
      setEnergy(prev => Math.max(prev - 1, 0));
    }
  };

  const handleBoostTap = () => {
    if (energy > 0) {
      const coinsEarned = 5;
      const xpEarned = 2;
      
      setCoins(prev => prev + coinsEarned);
      setXp(prev => prev + xpEarned);
      setEnergy(prev => Math.max(prev - 1, 0));
    }
  };

  const handleBoostUpgrade = () => {
    const upgradeCost = boostLevel === 0 ? 1000 : 2000;
    
    if (coins >= upgradeCost && boostLevel < 2) {
      setCoins(prev => prev - upgradeCost);
      setBoostLevel(prev => prev + 1);
    }
  };

  const handleEnergyRecharge = () => {
    if (energyRechargeCount < 3) {
      setEnergy(maxEnergy);
      setEnergyRechargeCount(prev => prev + 1);
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
            onBoostTap={handleBoostTap}
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
          className="text-neon-cyan hover:text-white hover:bg-neon-cyan/20"
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
        {renderActivePanel()}
      </div>

      {/* Bottom Navigation */}
      <div className="bg-card/80 backdrop-blur-sm border-t border-neon-cyan/20 p-4">
        <div className="grid grid-cols-4 gap-2 max-w-md mx-auto">
          <Button
            variant={activePanel === 'game' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActivePanel('game')}
            className={`flex flex-col items-center space-y-1 py-3 ${
              activePanel === 'game' 
                ? 'bg-gradient-to-r from-neon-cyan to-neon-purple text-dark-future' 
                : 'text-gray-subtle hover:text-neon-cyan'
            }`}
          >
            <Zap className="w-5 h-5" />
            <span className="text-xs">O'yin</span>
          </Button>
          
          <Button
            variant={activePanel === 'wallet' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActivePanel('wallet')}
            className={`flex flex-col items-center space-y-1 py-3 ${
              activePanel === 'wallet' 
                ? 'bg-gradient-to-r from-neon-cyan to-neon-purple text-dark-future' 
                : 'text-gray-subtle hover:text-neon-cyan'
            }`}
          >
            <Wallet className="w-5 h-5" />
            <span className="text-xs">Wallet</span>
          </Button>
          
          <Button
            variant={activePanel === 'leaderboard' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActivePanel('leaderboard')}
            className={`flex flex-col items-center space-y-1 py-3 ${
              activePanel === 'leaderboard' 
                ? 'bg-gradient-to-r from-neon-cyan to-neon-purple text-dark-future' 
                : 'text-gray-subtle hover:text-neon-cyan'
            }`}
          >
            <Trophy className="w-5 h-5" />
            <span className="text-xs">Reyting</span>
          </Button>
          
          <Button
            variant={activePanel === 'profile' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActivePanel('profile')}
            className={`flex flex-col items-center space-y-1 py-3 ${
              activePanel === 'profile' 
                ? 'bg-gradient-to-r from-neon-cyan to-neon-purple text-dark-future' 
                : 'text-gray-subtle hover:text-neon-cyan'
            }`}
          >
            <Settings className="w-5 h-5" />
            <span className="text-xs">Profil</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GameSection;
