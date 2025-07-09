
import { PieChart, Users, UserCog, Gift, Megaphone, Shield } from 'lucide-react';

const Tokenomics = () => {
  const tokenData = [
    {
      percentage: 50,
      label: "O'yin foydalanuvchilari",
      icon: Users,
      color: "from-neon-cyan to-blue-400",
      description: "Click-to-earn orqali"
    },
    {
      percentage: 20,
      label: "Jamoa",
      icon: UserCog,
      color: "from-neon-purple to-purple-400",
      description: "Rivojlantirish uchun"
    },
    {
      percentage: 15,
      label: "Referral rewards",
      icon: Gift,
      color: "from-green-400 to-emerald-400",
      description: "Do'stlar taklifi uchun"
    },
    {
      percentage: 10,
      label: "Marketing",
      icon: Megaphone,
      color: "from-orange-400 to-red-400",
      description: "Loyiha rivojlantirish"
    },
    {
      percentage: 5,
      label: "Rezerv",
      icon: Shield,
      color: "from-yellow-400 to-orange-400",
      description: "Kelajak uchun zaxira"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-dark-future to-dark-future/95 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-circuit-pattern opacity-10"></div>
        <div className="absolute top-20 right-20 w-96 h-96 bg-neon-cyan/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-neon-purple/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-slide-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Futurecoin Tokenomics</span>
          </h2>
          <p className="text-xl text-gray-subtle max-w-3xl mx-auto">
            Tokenlar qanday taqsimlanadi va har bir qism nima uchun ishlatiladi
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          
          {/* Left side - Pie chart visualization */}
          <div className="relative animate-slide-in-up">
            <div className="relative w-80 h-80 mx-auto">
              {/* Outer ring with segments */}
              <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
                <defs>
                  {tokenData.map((item, index) => (
                    <linearGradient key={index} id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#A020F0" stopOpacity="0.8" />
                    </linearGradient>
                  ))}
                </defs>
                
                {/* Background circle */}
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="10"
                />
                
                {/* Animated segments */}
                {tokenData.map((item, index) => {
                  const previousPercentages = tokenData.slice(0, index).reduce((sum, prev) => sum + prev.percentage, 0);
                  const circumference = 2 * Math.PI * 80;
                  const strokeDasharray = (item.percentage / 100) * circumference;
                  const strokeDashoffset = -((previousPercentages / 100) * circumference);
                  
                  return (
                    <circle
                      key={index}
                      cx="100"
                      cy="100"
                      r="80"
                      fill="none"
                      stroke={`url(#gradient-${index})`}
                      strokeWidth="12"
                      strokeDasharray={`${strokeDasharray} ${circumference}`}
                      strokeDashoffset={strokeDashoffset}
                      className="transition-all duration-1000 hover:stroke-width-16"
                      style={{
                        filter: 'drop-shadow(0 0 10px rgba(0, 240, 255, 0.5))',
                        animationDelay: `${index * 0.2}s`
                      }}
                    />
                  );
                })}
              </svg>

              {/* Center info */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <PieChart className="w-12 h-12 text-neon-cyan mx-auto mb-2 animate-glow-pulse" />
                  <div className="text-2xl font-bold gradient-text">$FUT</div>
                  <div className="text-sm text-gray-subtle">Token</div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-neon-cyan/20 rounded-full animate-circuit-float"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-neon-purple/20 rounded-full animate-circuit-float" style={{animationDelay: '0.5s'}}></div>
            </div>
          </div>

          {/* Right side - Token breakdown */}
          <div className="space-y-6 animate-slide-in-up" style={{animationDelay: '0.3s'}}>
            {tokenData.map((item, index) => (
              <div 
                key={index}
                className="group p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-transparent hover:border-neon-cyan/50 transition-all duration-300 animate-slide-in-up"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="flex items-center space-x-4">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${item.color} p-0.5 group-hover:animate-glow-pulse`}>
                    <div className="w-full h-full rounded-xl bg-dark-future flex items-center justify-center">
                      <item.icon className="w-7 h-7 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-white group-hover:text-neon-cyan transition-colors">
                        {item.label}
                      </h3>
                      <span className="text-2xl font-bold gradient-text">
                        {item.percentage}%
                      </span>
                    </div>
                    <p className="text-gray-subtle text-sm">
                      {item.description}
                    </p>
                    
                    {/* Progress bar */}
                    <div className="mt-3 w-full bg-gray-700/50 rounded-full h-2">
                      <div 
                        className={`bg-gradient-to-r ${item.color} h-2 rounded-full transition-all duration-1000`}
                        style={{
                          width: `${item.percentage}%`,
                          animationDelay: `${index * 0.2}s`
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Total supply info */}
            <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-neon-cyan/10 to-neon-purple/10 border border-neon-cyan/30">
              <div className="text-center">
                <h4 className="text-xl font-bold text-white mb-2">Jami Token Ta'minoti</h4>
                <div className="text-3xl font-bold gradient-text mb-2">1,000,000,000</div>
                <div className="text-gray-subtle">$FUT tokenlar</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom info */}
        <div className="mt-16 text-center animate-slide-in-up" style={{animationDelay: '0.8s'}}>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 rounded-xl bg-card/30 backdrop-blur-sm border border-neon-cyan/20">
                <div className="text-2xl font-bold gradient-text mb-2">TON Blockchain</div>
                <div className="text-gray-subtle">Tez va arzon tranzaksiyalar</div>
              </div>
              <div className="p-6 rounded-xl bg-card/30 backdrop-blur-sm border border-neon-cyan/20">
                <div className="text-2xl font-bold gradient-text mb-2">Fair Launch</div>
                <div className="text-gray-subtle">Barcha uchun adolatli taqsimot</div>
              </div>
              <div className="p-6 rounded-xl bg-card/30 backdrop-blur-sm border border-neon-cyan/20">
                <div className="text-2xl font-bold gradient-text mb-2">Community Driven</div>
                <div className="text-gray-subtle">Jamoa tomonidan boshqariladi</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tokenomics;
