
import { ArrowRight, Zap, FileText, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FinalCTA = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-dark-future to-dark-future/80 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-circuit-pattern opacity-10"></div>
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-neon-cyan/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-neon-purple/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-neon-cyan/5 to-transparent rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Main CTA content */}
          <div className="animate-slide-in-up">
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple p-1 mb-8 animate-glow-pulse">
              <div className="flex items-center justify-center w-full h-full rounded-full bg-dark-future">
                <Zap className="w-12 h-12 text-neon-cyan" />
              </div>
            </div>

            {/* Headline */}
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">Hozir boshlang!</span>
              <br />
              <span className="gradient-text neon-text">Kelajak sening qo'lingda.</span>
            </h2>

            {/* Description */}
            <p className="text-xl md:text-2xl text-gray-subtle mb-12 max-w-2xl mx-auto leading-relaxed">
              Millionlab foydalanuvchi Futurecoin bilan tokenlar yig'ishmoqda. Siz ham qo'shiling!
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-neon-cyan to-neon-purple hover:from-neon-purple hover:to-neon-cyan text-dark-future font-bold px-10 py-5 rounded-full transition-all duration-300 transform hover:scale-105 animate-glow-pulse text-lg"
              >
                <Zap className="mr-3 h-6 w-6" />
                Boshlash
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-dark-future font-semibold px-10 py-5 rounded-full transition-all duration-300 transform hover:scale-105 text-lg"
              >
                <FileText className="mr-3 h-5 w-5" />
                Whitepaper / Tokenomics
                <ExternalLink className="ml-3 h-5 w-5" />
              </Button>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {[
                { number: '125K+', label: 'Faol foydalanuvchilar', icon: '👥' },
                { number: '$10M+', label: 'Taqsimlangan token qiymati', icon: '💎' },
                { number: '24/7', label: 'Ishlaydigan yordam', icon: '🛟' }
              ].map((stat, index) => (
                <div key={index} className="text-center animate-slide-in-up" style={{animationDelay: `${index * 0.1}s`}}>
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold gradient-text">{stat.number}</div>
                  <div className="text-gray-subtle">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-gray-subtle">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span>TON Blockchain</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-neon-cyan rounded-full animate-pulse"></div>
                <span>Xavfsiz Smart Contract</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-neon-purple rounded-full animate-pulse"></div>
                <span>Audit qilingan</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                <span>Community Driven</span>
              </div>
            </div>
          </div>

          {/* Floating elements */}
          <div className="absolute top-20 left-10 w-16 h-16 bg-neon-cyan/20 rounded-full animate-circuit-float"></div>
          <div className="absolute top-40 right-10 w-12 h-12 bg-neon-purple/20 rounded-full animate-circuit-float" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute bottom-20 left-20 w-8 h-8 bg-gradient-to-r from-neon-cyan to-neon-purple rounded-full animate-circuit-float" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-32 right-16 w-10 h-10 bg-neon-cyan/30 rounded-full animate-circuit-float" style={{animationDelay: '1.5s'}}></div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-future to-transparent"></div>
    </section>
  );
};

export default FinalCTA;
