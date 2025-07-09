
import { MousePointer, TrendingUp, Wallet } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const HowItWorks = () => {
  const steps = [
    {
      icon: MousePointer,
      title: 'Tugmani bosish',
      description: 'Har bosishda siz token topasiz.',
      gradient: 'from-neon-cyan to-blue-400'
    },
    {
      icon: TrendingUp,
      title: 'Level va XP',
      description: "O'sib boring, token yig'ish tezlashadi.",
      gradient: 'from-neon-purple to-purple-400'
    },
    {
      icon: Wallet,
      title: 'TON wallet orqali airdrop',
      description: "To'plagan tokenlaringizni real tokenlarga aylantiring.",
      gradient: 'from-green-400 to-neon-cyan'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-dark-future to-dark-future/95 relative">
      <div className="absolute inset-0 bg-circuit-pattern opacity-5"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Qanday ishlaydi?</span>
          </h2>
          <p className="text-xl text-gray-subtle max-w-2xl mx-auto">
            Uch oddiy qadamda kelajak tokenlarini qo'lga kiriting
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <Card 
              key={index} 
              className="relative group cursor-pointer transition-all duration-500 hover:scale-105 bg-card/80 backdrop-blur-sm border-2 border-transparent hover:border-neon-cyan/50 animate-slide-in-up"
              style={{animationDelay: `${index * 0.2}s`}}
            >
              <CardContent className="p-8 text-center">
                {/* Step number */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple flex items-center justify-center text-dark-future font-bold text-sm">
                    {index + 1}
                  </div>
                </div>

                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r ${step.gradient} p-1 mb-6 animate-glow-pulse group-hover:animate-circuit-float`}>
                  <div className="flex items-center justify-center w-full h-full rounded-full bg-dark-future">
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-neon-cyan transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-gray-subtle text-lg leading-relaxed">
                  {step.description}
                </p>

                {/* Hover effect glow */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-neon-cyan/10 to-neon-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Connection lines between steps (desktop only) */}
        <div className="hidden md:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl mx-auto">
          <svg className="w-full h-2" viewBox="0 0 800 20">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#A020F0" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#00F0FF" stopOpacity="0.6" />
              </linearGradient>
            </defs>
            <path
              d="M100 10 L300 10 M500 10 L700 10"
              stroke="url(#lineGradient)"
              strokeWidth="2"
              strokeDasharray="10,5"
              className="animate-pulse"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
