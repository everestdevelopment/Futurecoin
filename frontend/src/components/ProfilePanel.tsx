
import { User, Settings, Star, Zap, TrendingUp, Calendar, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProfilePanelProps {
  coins: number;
  level: number;
  xp: number;
}

const ProfilePanel = ({ coins, level, xp }: ProfilePanelProps) => {
  const joinDate = new Date('2024-01-15').toLocaleDateString('uz-UZ');
  const totalTaps = Math.floor(coins / 10);
  const daysPlayed = Math.floor((Date.now() - new Date('2024-01-15').getTime()) / (1000 * 60 * 60 * 24));

  const achievements = [
    { id: 1, name: 'Birinchi qadam', description: '100 ta coin yig\'ing', completed: coins >= 100, icon: '🎯' },
    { id: 2, name: 'Coin yig\'uvchi', description: '1,000 ta coin yig\'ing', completed: coins >= 1000, icon: '💰' },
    { id: 3, name: 'Ustoz', description: '10-levelga yeting', completed: level >= 10, icon: '🏆' },
    { id: 4, name: 'Faol o\'yinchi', description: '30 kun o\'ynang', completed: daysPlayed >= 30, icon: '📅' },
    { id: 5, name: 'Coin millioneri', description: '1,000,000 coin yig\'ing', completed: coins >= 1000000, icon: '💎' },
    { id: 6, name: 'Tap masteri', description: '100,000 marta bosing', completed: totalTaps >= 100000, icon: '👆' },
  ];

  const completedAchievements = achievements.filter(a => a.completed).length;

  return (
    <div className="flex-1 p-4 space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple p-1 mb-4 animate-glow-pulse">
          <div className="w-full h-full rounded-full bg-dark-future flex items-center justify-center">
            <User className="w-10 h-10 text-neon-cyan" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-white mb-1">Profil</h2>
        <p className="text-gray-subtle">@{new Date().getTime().toString().slice(-6)}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-card/50 backdrop-blur-sm rounded-xl p-4 border border-neon-cyan/20 text-center">
          <Zap className="w-6 h-6 text-neon-cyan mx-auto mb-2" />
          <div className="text-lg font-bold text-white">{coins.toLocaleString()}</div>
          <div className="text-xs text-gray-subtle">Jami coinlar</div>
        </div>
        
        <div className="bg-card/50 backdrop-blur-sm rounded-xl p-4 border border-neon-purple/20 text-center">
          <Star className="w-6 h-6 text-neon-purple mx-auto mb-2" />
          <div className="text-lg font-bold text-white">{level}</div>
          <div className="text-xs text-gray-subtle">Level</div>
        </div>
        
        <div className="bg-card/50 backdrop-blur-sm rounded-xl p-4 border border-green-400/20 text-center">
          <TrendingUp className="w-6 h-6 text-green-400 mx-auto mb-2" />
          <div className="text-lg font-bold text-white">{totalTaps.toLocaleString()}</div>
          <div className="text-xs text-gray-subtle">Jami bosishlar</div>
        </div>
        
        <div className="bg-card/50 backdrop-blur-sm rounded-xl p-4 border border-yellow-400/20 text-center">
          <Calendar className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
          <div className="text-lg font-bold text-white">{daysPlayed}</div>
          <div className="text-xs text-gray-subtle">Kun o'ynagan</div>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-card/50 backdrop-blur-sm rounded-xl border border-neon-cyan/20">
        <div className="bg-gradient-to-r from-neon-cyan/20 to-neon-purple/20 p-4 border-b border-neon-cyan/20">
          <h3 className="font-bold text-white flex items-center justify-between">
            <span>Yutuqlar</span>
            <span className="text-sm font-normal">{completedAchievements}/{achievements.length}</span>
          </h3>
        </div>
        
        <div className="p-4 space-y-3">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-700 ${
                achievement.completed 
                  ? 'bg-gradient-to-r from-green-400/10 to-neon-cyan/10 border border-green-400/20' 
                  : 'bg-card/30 border border-gray-600/20'
              }`}
            >
              <div className="text-2xl">{achievement.icon}</div>
              <div className="flex-1">
                <div className={`font-medium ${achievement.completed ? 'text-green-400' : 'text-gray-subtle'}`}>
                  {achievement.name}
                </div>
                <div className="text-xs text-gray-subtle">
                  {achievement.description}
                </div>
              </div>
              {achievement.completed && (
                <div className="w-6 h-6 rounded-full bg-green-400 flex items-center justify-center">
                  <span className="text-dark-future text-xs">✓</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Account Info */}
      <div className="bg-card/30 backdrop-blur-sm rounded-xl p-4 border border-neon-cyan/10 space-y-3">
        <h4 className="text-sm font-medium text-white flex items-center space-x-2">
          <Settings className="w-4 h-4" />
          <span>Hisob ma'lumotlari</span>
        </h4>
        <div className="space-y-2 text-xs text-gray-subtle">
          <div className="flex justify-between">
            <span>Qo'shilgan sana:</span>
            <span>{joinDate}</span>
          </div>
          <div className="flex justify-between">
            <span>Telegram ID:</span>
            <span>@futurecoin_user</span>
          </div>
          <div className="flex justify-between">
            <span>Joriy XP:</span>
            <span>{xp}/{level * 100}</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <Button
          className="w-full bg-gradient-to-r from-neon-cyan to-neon-purple hover:from-neon-purple hover:to-neon-cyan text-dark-future font-semibold py-3 rounded-full"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Do'stlarni taklif qilish
        </Button>
        
        <Button
          variant="outline"
          className="w-full border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-dark-future py-3 rounded-full"
        >
          <Settings className="w-4 h-4 mr-2" />
          Sozlamalar
        </Button>
      </div>
    </div>
  );
};

export default ProfilePanel;
