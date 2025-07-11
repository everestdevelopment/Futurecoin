
import { useEffect, useState } from 'react';
import { Users, Coins, UserPlus, Zap } from 'lucide-react';
import { getStats } from '@/lib/api';

const Statistics = () => {
  const [counts, setCounts] = useState({
    users: 0,
    coins: 0,
    referrals: 0,
    tokens: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStats()
      .then(res => {
        setCounts({
          users: res.users,
          coins: res.coins,
          referrals: res.referrals,
          tokens: Math.floor(res.coins / 1000)
        });
      })
      .finally(() => setLoading(false));
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'K';
    }
    return num.toLocaleString();
  };

  const stats = [
    {
      icon: Users,
      number: loading ? '...' : formatNumber(counts.users) + '+',
      label: 'Foydalanuvchilar',
      emoji: '🌍',
      color: 'from-neon-cyan to-blue-400'
    },
    {
      icon: Coins,
      number: loading ? '...' : formatNumber(counts.coins) + '+',
      label: 'Tanga topilgan',
      emoji: '⛏',
      color: 'from-yellow-400 to-orange-400'
    },
    {
      icon: UserPlus,
      number: loading ? '...' : formatNumber(counts.referrals) + '+',
      label: 'Referral orqali',
      emoji: '👥',
      color: 'from-neon-purple to-pink-400'
    },
    {
      icon: Zap,
      number: loading ? '...' : formatNumber(counts.tokens) + '+',
      label: "FUT tokenlar", // TON'da tez orada!
      emoji: '🪙',
      color: 'from-green-400 to-neon-cyan'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-dark-future to-dark-future/90 relative">
      {/* Background effects */}
      <div className="absolute inset-0 bg-circuit-pattern opacity-5"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-slide-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Real-time Statistika</span>
          </h2>
          <p className="text-xl text-gray-subtle max-w-2xl mx-auto">
            Futurecoin jamoasining o'sishi va muvaffaqiyatlari
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="relative group animate-slide-in-up"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 border-2 border-transparent hover:border-neon-cyan/50 relative overflow-hidden">
                {/* Background glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 to-neon-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                {/* Icon and emoji */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} animate-glow-pulse`}>
                    <stat.icon className="w-8 h-8 text-dark-future" />
                  </div>
                  <span className="text-3xl animate-circuit-float" style={{animationDelay: `${index * 0.2}s`}}>
                    {stat.emoji}
                  </span>
                </div>
                {/* Numbers */}
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold gradient-text mb-2 animate-counter-up">
                    {stat.number}
                  </div>
                  <div className="text-gray-subtle text-lg font-medium">
                    {stat.label}
                  </div>
                </div>
                {/* Animated border */}
                <div className="absolute inset-0 rounded-2xl border-2 border-gradient-to-r from-neon-cyan to-neon-purple opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </div>
            </div>
          ))}
        </div>
        {/* Bottom CTA */}
        <div className="text-center mt-16 animate-slide-in-up" style={{animationDelay: '0.5s'}}>
          <p className="text-lg text-gray-subtle mb-6">
            Sizda ham qo'shiling va kelajak tokenlarini qo'lga kiriting!
          </p>
          <div className="inline-flex items-center space-x-2 text-neon-cyan">
            <Zap className="w-5 h-5 animate-pulse" />
            <span className="font-semibold">Har soniyada yangi foydalanuvchilar qo'shilmoqda</span>
            <Zap className="w-5 h-5 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
