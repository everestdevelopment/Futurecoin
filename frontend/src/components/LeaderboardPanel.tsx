
import { useEffect, useState } from 'react';
import { Trophy, Medal, Crown, Star } from 'lucide-react';
import { getLeaderboard, getProfile } from '@/lib/api';

interface LeaderboardPanelProps {
  userCoins: number;
  userLevel: number;
}

const LeaderboardPanel = ({ userCoins, userLevel }: LeaderboardPanelProps) => {
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      getLeaderboard(),
      getProfile()
    ]).then(([lb, prof]) => {
      setLeaderboard(lb.leaderboard);
      setUser(prof.user);
    }).finally(() => setLoading(false));
  }, []);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-5 h-5 text-yellow-400" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-300" />;
      case 3:
        return <Medal className="w-5 h-5 text-orange-400" />;
      default:
        return <span className="w-5 h-5 flex items-center justify-center text-gray-subtle font-bold text-sm">#{rank}</span>;
    }
  };

  // Foydalanuvchi o‘rni
  const userRank = leaderboard.findIndex(u => u.telegramId === user?.telegramId) + 1;

  return (
    <div className="flex-1 p-4 space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 p-1 mb-4 animate-glow-pulse">
          <div className="w-full h-full rounded-full bg-dark-future flex items-center justify-center">
            <Trophy className="w-8 h-8 text-yellow-400" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Reyting jadvali</h2>
        <p className="text-gray-subtle">Eng yaxshi o'yinchilar ro'yxati</p>
      </div>

      {/* User Rank */}
      {user && (
        <div className="bg-gradient-to-r from-neon-cyan/20 to-neon-purple/20 rounded-xl p-4 border border-neon-cyan/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">🎮</div>
              <div>
                <div className="font-bold text-white">Sizning o'rningiz</div>
                <div className="text-sm text-gray-subtle">#{userRank || '-'} - Level {user.level}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold gradient-text">{user.coins.toLocaleString()}</div>
              <div className="text-sm text-gray-subtle">coins</div>
            </div>
          </div>
        </div>
      )}

      {/* Leaderboard */}
      <div className="bg-card/50 backdrop-blur-sm rounded-xl border border-neon-cyan/20 overflow-hidden">
        <div className="bg-gradient-to-r from-neon-cyan/20 to-neon-purple/20 p-4 border-b border-neon-cyan/20">
          <h3 className="font-bold text-white">Top O'yinchilar</h3>
        </div>
        <div className="divide-y divide-neon-cyan/10">
          {loading ? (
            <div className="p-4 text-center text-neon-cyan">Yuklanmoqda...</div>
          ) : (
            leaderboard.slice(0, 10).map((player, idx) => (
              <div
                key={player.telegramId}
                className={`p-4 flex items-center justify-between ${player.telegramId === user?.telegramId ? 'bg-gradient-to-r from-neon-cyan/10 to-neon-purple/10 border-l-4 border-neon-cyan' : ''}`}
              >
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8">
                    {getRankIcon(idx + 1)}
                  </div>
                  <div className="text-2xl">{idx < 3 ? ['👑','🚀','⚡'][idx] : '🎮'}</div>
                  <div>
                    <div className={`font-medium ${player.telegramId === user?.telegramId ? 'text-neon-cyan' : 'text-white'}`}>{player.username || 'Anon'}</div>
                    <div className="text-sm text-gray-subtle flex items-center space-x-1">
                      <Star className="w-3 h-3" />
                      <span>Level {player.level}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-bold ${player.telegramId === user?.telegramId ? 'text-neon-cyan' : 'text-white'}`}>{player.coins.toLocaleString()}</div>
                  <div className="text-xs text-gray-subtle">coins</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Rewards Info */}
      <div className="bg-card/30 backdrop-blur-sm rounded-xl p-4 border border-yellow-400/20">
        <h4 className="text-sm font-medium text-white mb-3 flex items-center space-x-2">
          <Trophy className="w-4 h-4 text-yellow-400" />
          <span>Haftalik mukofotlar</span>
        </h4>
        <div className="space-y-2 text-xs text-gray-subtle">
          <div className="flex items-center justify-between">
            <span>🥇 1-o'rin:</span>
            <span className="text-yellow-400 font-medium">10,000 FUT</span>
          </div>
          <div className="flex items-center justify-between">
            <span>🥈 2-o'rin:</span>
            <span className="text-gray-300 font-medium">5,000 FUT</span>
          </div>
          <div className="flex items-center justify-between">
            <span>🥉 3-o'rin:</span>
            <span className="text-orange-400 font-medium">2,500 FUT</span>
          </div>
          <div className="flex items-center justify-between">
            <span>🏆 Top 10:</span>
            <span className="text-neon-cyan font-medium">1,000 FUT</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPanel;
