import { useState, useEffect } from 'react';
import { Zap, Battery, TrendingUp, Rocket, RefreshCw, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GameMainProps {
  coins: number;
  level: number;
  xp: number;
  energy: number;
  maxEnergy: number;
  onCoinTap: () => void;
  onBoostTap: () => void;
  onBoostUpgrade: () => void;
  onEnergyRecharge: () => void;
  canUseEnergyRecharge: boolean;
  energyRechargeCount: number;
  boostLevel: number;
  // Qo'shaman:
  onBoostEnergy: () => void;
  canUseBoostEnergy: boolean;
  boostEnergyCost: number;
}

const GameMain = ({ 
  coins, 
  level, 
  xp, 
  energy, 
  maxEnergy, 
  onCoinTap, 
  onBoostTap, 
  onBoostUpgrade,
  onEnergyRecharge, 
  canUseEnergyRecharge, 
  energyRechargeCount,
  boostLevel,
  // Qo'shaman:
  onBoostEnergy,
  canUseBoostEnergy,
  boostEnergyCost
}: GameMainProps) => {
  const [tapEffects, setTapEffects] = useState<Array<{ id: number; x: number; y: number; coins: number }>>([]);

  const getBoostInfo = () => {
    switch (boostLevel) {
      case 0:
        return { 
          cost: 1000, 
          bonus: 15, 
          canUpgrade: coins >= 1000 
        };
      case 1:
        return { 
          cost: 2000, 
          bonus: 25, 
          canUpgrade: coins >= 2000 
        };
      case 2:
        return { 
          cost: 0, 
          bonus: 25, 
          canUpgrade: false 
        };
      default:
        return { 
          cost: 1000, 
          bonus: 15, 
          canUpgrade: coins >= 1000 
        };
    }
  };

  const handleTap = (e: React.MouseEvent<HTMLDivElement>) => {
    if (energy <= 0) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const baseCoins = level * 10;
    const boostBonus = boostLevel === 1 ? 15 : boostLevel === 2 ? 25 : 0;
    const totalCoins = baseCoins + boostBonus;

    const newEffect = {
      id: Date.now() + Math.random(),
      x,
      y,
      coins: totalCoins
    };

    setTapEffects(prev => [...prev, newEffect]);
    onCoinTap();

    setTimeout(() => {
      setTapEffects(prev => prev.filter(effect => effect.id !== newEffect.id));
    }, 1000);
  };

  const handleBoostTap = (e: React.MouseEvent<HTMLDivElement>) => {
    if (energy <= 0) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Add boost tap effect
    const newEffect = {
      id: Date.now() + Math.random(),
      x,
      y,
      coins: 5
    };

    setTapEffects(prev => [...prev, newEffect]);
    onBoostTap();

    // Remove tap effect after animation
    setTimeout(() => {
      setTapEffects(prev => prev.filter(effect => effect.id !== newEffect.id));
    }, 1000);
  };

  const xpNeeded = level * 100;
  const xpProgress = (xp / xpNeeded) * 100;
  const boostInfo = getBoostInfo();

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-circuit-pattern opacity-5"></div>
      
      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-neon-cyan rounded-full opacity-30 animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${Math.random() * 2 + 2}s`
          }}
        />
      ))}

      {/* Stats Bar */}
      <div className="w-full max-w-md mb-8 space-y-4">
        {/* Energy Bar */}
        <div className="bg-card/50 backdrop-blur-sm rounded-xl p-4 border border-neon-cyan/20">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Battery className="w-4 h-4 text-neon-cyan" />
              <span className="text-sm font-medium">Energiya</span>
            </div>
            <span className="text-sm text-gray-subtle">{energy}/{maxEnergy}</span>
          </div>
          <div className="w-full bg-dark-future rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-neon-cyan to-blue-400 h-2 rounded-full transition-all duration-700"
              style={{ width: `${(energy / maxEnergy) * 100}%` }}
            />
          </div>
        </div>

        {/* XP Bar */}
        <div className="bg-card/50 backdrop-blur-sm rounded-xl p-4 border border-neon-purple/20">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-neon-purple" />
              <span className="text-sm font-medium">Level {level}</span>
            </div>
            <span className="text-sm text-gray-subtle">{xp}/{xpNeeded} XP</span>
          </div>
          <div className="w-full bg-dark-future rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-neon-purple to-pink-400 h-2 rounded-full transition-all duration-700"
              style={{ width: `${xpProgress}%` }}
            />
          </div>
        </div>

        {/* Boost Status */}
        {boostLevel > 0 && (
          <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-sm rounded-xl p-4 border border-orange-500/30">
            <div className="flex items-center justify-center space-x-2">
              <ArrowUp className="w-4 h-4 text-orange-400" />
              <span className="text-sm font-medium text-orange-400">
                Boost Faol: +{boostInfo.bonus} coin/tap
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Bitta katta coin tugma */}
      <div className="relative mb-8 flex items-center justify-center">
        <div 
          className={`w-260 h-260 rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple p-2 cursor-pointer select-none ${energy > 0 ? '' : 'opacity-50 cursor-not-allowed'}`}
          onClick={handleTap}
        >
          <div className="w-full h-full rounded-full bg-dark-future flex items-center justify-center">
            <Zap className="w-80 h-80 text-neon-cyan" />
          </div>
        </div>

        {/* Tap Effects */}
        {tapEffects.map((effect) => (
          <div
            key={effect.id}
            className="absolute pointer-events-none z-10 animate-tap-float"
            style={{
              left: effect.x - 20,
              top: effect.y - 20,
            }}
          >
            <div className="bg-gradient-to-r from-neon-cyan to-neon-purple text-dark-future font-bold px-3 py-1 rounded-full text-sm">
              +{effect.coins}
            </div>
          </div>
        ))}
      </div>

      {/* Boost Buttons */}
      <div className="flex space-x-4 mb-6">
        {/* Boost Upgrade Button */}
        <div className="relative">
          {boostLevel < 2 ? (
            <Button
              onClick={onBoostUpgrade}
              disabled={!boostInfo.canUpgrade}
              className={`w-10 h-10 rounded-full p-0 ${
                boostInfo.canUpgrade 
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:scale-105' 
                  : 'opacity-50 cursor-not-allowed bg-gray-600'
              }`}
            >
              <div className="flex flex-col items-center">
                <Rocket className="w-3 h-3 text-white" />
                <span className="text-[10px] text-white">UP</span>
              </div>
            </Button>
          ) : (
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-orange-500 to-red-500 p-1 flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-dark-future flex items-center justify-center">
                <Rocket className="w-8 h-8 text-orange-400" />
              </div>
            </div>
          )}
          <div className="text-center mt-2">
            {boostLevel < 2 ? (
              <>
                <span className="text-xs text-gray-subtle">
                  {boostInfo.cost} coin
                </span>
                <div className="text-xs text-orange-400">
                  +{boostLevel === 0 ? 15 : 25}/tap
                </div>
              </>
            ) : (
              <span className="text-xs text-orange-400">MAX</span>
            )}
          </div>
        </div>

        {/* Old Boost Button (keeping for +5 coins) */}
        <div className="relative">
          <div 
            className={`w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 p-1 cursor-pointer select-none ${
              energy > 0 ? 'hover:scale-105' : 'opacity-50 cursor-not-allowed'
            }`}
            onClick={handleBoostTap}
          >
            <div className="w-full h-full rounded-full bg-dark-future flex items-center justify-center">
              <Zap className="w-4 h-4 text-green-400" />
            </div>
          </div>
          <div className="text-center mt-2">
            <span className="text-xs text-gray-subtle">+5 Coins</span>
          </div>
        </div>

        {/* Energy Recharge Button */}
        <div className="relative">
          <Button
            onClick={onEnergyRecharge}
            disabled={!canUseEnergyRecharge}
            className={`w-10 h-10 rounded-full p-0 ${
              canUseEnergyRecharge 
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:scale-105' 
                : 'opacity-50 cursor-not-allowed bg-gray-600'
            }`}
          >
            <RefreshCw className="w-4 h-4 text-white" />
          </Button>
          <div className="text-center mt-2">
            <span className="text-xs text-gray-subtle">Energiya</span>
            <div className="text-xs text-gray-subtle">{3 - energyRechargeCount}/3</div>
          </div>
        </div>
        {/* Boost Energy Button */}
        <div className="relative">
          <Button
            onClick={onBoostEnergy}
            disabled={!canUseBoostEnergy}
            className={`w-10 h-10 rounded-full p-0 ${
              canUseBoostEnergy 
                ? 'bg-gradient-to-r from-pink-500 to-yellow-400 hover:scale-105' 
                : 'opacity-50 cursor-not-allowed bg-gray-600'
            }`}
          >
            <Battery className="w-4 h-4 text-yellow-300" />
          </Button>
          <div className="text-center mt-2">
            <span className="text-xs text-gray-subtle">Boost Energy</span>
            <div className="text-xs text-gray-subtle">-{boostEnergyCost} coin</div>
            <div className="text-xs text-green-400">+500 energy</div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="text-center max-w-sm">
        {energy > 0 ? (
          <>
            <h3 className="text-xl font-bold text-white mb-2">
              Tangani bosing!
            </h3>
            <p className="text-gray-subtle">
              Har bosishda {level * 10}{boostLevel > 0 ? ` + ${boostInfo.bonus}` : ''} coin va 5 XP oling
            </p>
          </>
        ) : (
          <>
            <h3 className="text-xl font-bold text-red-400 mb-2">
              Energiya tugadi!
            </h3>
            <p className="text-gray-subtle">
              Energiya qayta tiklanishini kuting yoki energiya tugmasini bosing...
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default GameMain;

