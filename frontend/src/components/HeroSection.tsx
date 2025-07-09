
import { ArrowRight, Zap, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  onStartGame: () => void;
}

const HeroSection = ({ onStartGame }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-dark-future via-dark-future to-purple-900/20">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-circuit-pattern opacity-10"></div>
      
      {/* Floating particles */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${Math.random() * 6 + 6}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo */}
          <div className="mb-8 animate-slide-in-up" style={{animationDuration: '1.2s'}}>
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple p-1 animate-glow-pulse">
              <div className="flex items-center justify-center w-full h-full rounded-full bg-dark-future">
                <Zap className="w-10 h-10 text-neon-cyan" />
              </div>
            </div>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-in-up" style={{animationDuration: '1.5s'}}>
            <span className="gradient-text neon-text">
              Earn the Future.
            </span>
            <br />
            <span className="text-white">
              One Tap at a Time.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-subtle mb-12 max-w-2xl mx-auto leading-relaxed animate-slide-in-up" style={{animationDelay: '0.4s', animationDuration: '1.2s'}}>
            Futurecoin — Telegram'da ishlaydigan oddiy, lekin kuchli click-to-earn o'yin.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-slide-in-up" style={{animationDelay: '0.8s', animationDuration: '1.2s'}}>
            <Button 
              size="lg" 
              onClick={onStartGame}
              className="bg-gradient-to-r from-neon-cyan to-neon-purple hover:from-neon-purple hover:to-neon-cyan text-dark-future font-semibold px-8 py-4 rounded-full animate-glow-pulse"
            >
              <Zap className="mr-2 h-5 w-5" />
              Boshlash (Telegram orqali)
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-dark-future font-semibold px-8 py-4 rounded-full transition-all duration-700 transform hover:scale-105"
            >
              <Wallet className="mr-2 h-5 w-5" />
              TON wallet ulash
            </Button>
          </div>

          {/* Floating stats preview */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 animate-slide-in-up" style={{animationDelay: '1.2s', animationDuration: '1.5s'}}>
            {[
              { number: '125K+', label: 'Foydalanuvchilar' },
              { number: '32M+', label: 'Topilgan tangalar' },
              { number: '85K+', label: 'Referral orqali' }
            ].map((stat, index) => (
              <div key={index} className="text-center p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-neon-cyan/20 hover:border-neon-cyan/40 transition-all duration-700 animate-circuit-float" style={{animationDelay: `${index * 0.8}s`, animationDuration: '4s'}}>
                <div className="text-3xl font-bold gradient-text">{stat.number}</div>
                <div className="text-gray-subtle mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gradient overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-future to-transparent"></div>
    </section>
  );
};

export default HeroSection;
