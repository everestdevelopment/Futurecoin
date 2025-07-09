
import { Trophy, Medal, Crown, Star } from 'lucide-react';

interface LeaderboardPanelProps {
  userCoins: number;
  userLevel: number;
}

const LeaderboardPanel = ({ userCoins, userLevel }: LeaderboardPanelProps) => {
  const leaderboardData = [
    { name: 'CryptoKing', coins: 1250000, level: 25, avatar: '👑' },
    { name: 'TonMaster', coins: 980000, level: 22, avatar: '🚀' },
    { name: 'FutureCoin', coins: 750000, level: 19, avatar: '⚡' },
    { name: 'BlockchainPro', coins: 650000, level: 17, avatar: '💎' },
    { name: 'DigitalMiner', coins: 500000, level: 15, avatar: '⛏️' },
    { name: 'CoinHunter', coins: 420000, level: 14, avatar: '🎯' },
    { name: 'TokenFarmer', coins: 380000, level: 13, avatar: '🌾' },
    { name: 'CryptoNinja', coins: 350000, level: 12, avatar: '🥷' },
  ];

  // Add user to leaderboard
  const userEntry = {
    name: 'Siz',
    coins: userCoins,
    level: userLevel,
    avatar: '🎮'
  };

  const fullLeaderboard = [...leaderboardData, userEntry]
    .sort((a, b) => b.coins - a.coins)
    .map((entry, index) => ({ ...entry, rank: index + 1 }));

  const userRank = fullLeaderboard.find(entry => entry.name === 'Siz')?.rank || 0;

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
      <div className="bg-gradient-to-r from-neon-cyan/20 to-neon-purple/20 rounded-xl p-4 border border-neon-cyan/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">{userEntry.avatar}</div>
            <div>
              <div className="font-bold text-white">Sizning o'rningiz</div>
              <div className="text-sm text-gray-subtle">#{userRank} - Level {userLevel}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold gradient-text">{userCoins.toLocaleString()}</div>
            <div className="text-sm text-gray-subtle">coins</div>
          </div>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="bg-card/50 backdrop-blur-sm rounded-xl border border-neon-cyan/20 overflow-hidden">
        <div className="bg-gradient-to-r from-neon-cyan/20 to-neon-purple/20 p-4 border-b border-neon-cyan/20">
          <h3 className="font-bold text-white">Top O'yinchilar</h3>
        </div>
        
        <div className="divide-y divide-neon-cyan/10">
          {fullLeaderboard.slice(0, 10).map((player) => (
            <div
              key={player.name}
              className={`p-4 flex items-center justify-between transition-all duration-300 ${
                player.name === 'Siz' 
                  ? 'bg-gradient-to-r from-neon-cyan/10 to-neon-purple/10 border-l-4 border-neon-cyan' 
                  : 'hover:bg-card/30'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-8 h-8">
                  {getRankIcon(player.rank)}
                </div>
                <div className="text-2xl">{player.avatar}</div>
                <div>
                  <div className={`font-medium ${player.name === 'Siz' ? 'text-neon-cyan' : 'text-white'}`}>
                    {player.name}
                  </div>
                  <div className="text-sm text-gray-subtle flex items-center space-x-1">
                    <Star className="w-3 h-3" />
                    <span>Level {player.level}</span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className={`font-bold ${player.name === 'Siz' ? 'text-neon-cyan' : 'text-white'}`}>
                  {player.coins.toLocaleString()}
                </div>
                <div className="text-xs text-gray-subtle">coins</div>
              </div>
            </div>
          ))}
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
