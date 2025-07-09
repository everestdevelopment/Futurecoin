
import { Smartphone, Users, Coins, Gamepad2 } from 'lucide-react';

const Benefits = () => {
  const benefits = [
    {
      icon: Smartphone,
      title: "Telegram ichida ishlaydi",
      description: "o'rnatish shart emas"
    },
    {
      icon: Users,
      title: "Referral tizimi orqali",
      description: "tokenni ko'p oling"
    },
    {
      icon: Coins,
      title: "TON blockchain'da",
      description: "haqiqiy token olish imkoniyati"
    },
    {
      icon: Gamepad2,
      title: "O'yin kabi",
      description: "ammo token sizniki"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-dark-future/95 to-dark-future relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-neon-cyan/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          
          {/* Left side - Text content */}
          <div className="space-y-8 animate-slide-in-up">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="gradient-text">Nega Futurecoin?</span>
              </h2>
              <p className="text-xl text-gray-subtle leading-relaxed">
                Kelajak tokenlari endi barcha uchun ochiq. Oddiy, tez va foydali.
              </p>
            </div>

            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="flex items-start space-x-4 p-4 rounded-xl bg-card/30 backdrop-blur-sm border border-neon-cyan/20 hover:border-neon-cyan/40 group animate-slide-in-up"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-neon-cyan to-neon-purple p-0.5 group-hover:animate-glow-pulse">
                      <div className="w-full h-full rounded-lg bg-dark-future flex items-center justify-center">
                        <benefit.icon className="w-6 h-6 text-neon-cyan" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-neon-cyan transition-colors">
                      ❇️ {benefit.title}
                    </h3>
                    <p className="text-gray-subtle">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Visual elements */}
          <div className="relative animate-slide-in-up" style={{animationDelay: '0.3s'}}>
            <div className="relative">
              {/* Main phone mockup */}
              <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-3xl p-2 shadow-2xl border-2 border-neon-cyan/30 animate-circuit-float">
                <div className="bg-dark-future rounded-2xl overflow-hidden">
                  {/* Phone screen content */}
                  <div className="aspect-[9/19] bg-gradient-to-b from-dark-future to-purple-900/20 relative overflow-hidden">
                    {/* Status bar */}
                    <div className="flex justify-between items-center p-4 text-white text-sm">
                      <span>9:41</span>
                      <span>Telegram</span>
                      <span>100%</span>
                    </div>
                    
                    {/* App content mockup */}
                    <div className="p-6 space-y-6">
                      <div className="text-center">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple mx-auto mb-4 animate-glow-pulse flex items-center justify-center">
                          <Coins className="w-10 h-10 text-dark-future" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">125,847</h3>
                        <p className="text-neon-cyan text-sm">FUT Tokens</p>
                      </div>
                      
                      <div className="bg-card/30 rounded-xl p-4 border border-neon-cyan/20">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-white text-sm">Level 12</span>
                          <span className="text-neon-cyan text-sm">XP: 2,450</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div className="bg-gradient-to-r from-neon-cyan to-neon-purple h-2 rounded-full" style={{width: '75%'}}></div>
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <button className="w-32 h-32 rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple flex items-center justify-center text-dark-future font-bold text-xl animate-glow-pulse">
                          TAP
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-8 -right-8 w-16 h-16 bg-neon-purple/20 rounded-full animate-circuit-float" style={{animationDelay: '0.5s'}}></div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-neon-cyan/20 rounded-full animate-circuit-float" style={{animationDelay: '1s'}}></div>
              <div className="absolute top-16 -left-8 w-8 h-8 bg-gradient-to-r from-neon-cyan to-neon-purple rounded-full animate-circuit-float" style={{animationDelay: '1.5s'}}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
