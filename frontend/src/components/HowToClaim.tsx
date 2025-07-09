
import { Smartphone, MousePointer, Wallet, ArrowRight, CheckCircle } from 'lucide-react';

const HowToClaim = () => {
  const steps = [
    {
      number: 1,
      icon: Smartphone,
      title: "Telegram orqali kirish",
      description: "Telegram bot yoki mini-app orqali ro'yxatdan o'ting",
      details: ["@FuturecoinBot ni boshlang", "Telefon raqamingizni tasdiqlang", "Darhol o'ynashni boshlang"],
      color: "from-neon-cyan to-blue-400"
    },
    {
      number: 2,
      icon: MousePointer,
      title: "Tugmani bosib token yig'ish",
      description: "Har bosishda tokenlar va XP yig'ing, levelingizni oshiring",
      details: ["Ekrandagi tugmani bosing", "Tokenlar va XP oling", "Levelingiz ortishi bilan ko'proq token oling"],
      color: "from-neon-purple to-purple-400"
    },
    {
      number: 3,
      icon: Wallet,
      title: "TON wallet ulab, tokenni olish",
      description: "TON wallet ulab, to'plagan tokenlaringizni real $FUT tokenlariga aylantiring",
      details: ["TON wallet ulanishini tasdiqlang", "Minimum miqdorga yeting", "Tokenlaringizni claim qiling"],
      color: "from-green-400 to-emerald-400"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-dark-future/95 to-dark-future relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-circuit-pattern opacity-5"></div>
        <div className="absolute top-10 right-10 w-64 h-64 bg-neon-cyan/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-neon-purple/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-slide-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Qanday olish</span>
          </h2>
          <p className="text-xl text-gray-subtle max-w-3xl mx-auto">
            3 ta oddiy qadamda Futurecoin tokenlarini qo'lga kiriting
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="relative mb-12 last:mb-0 animate-slide-in-up"
              style={{animationDelay: `${index * 0.2}s`}}
            >
              {/* Connecting line (except for last step) */}
              {index !== steps.length - 1 && (
                <div className="hidden md:block absolute left-1/2 top-32 w-0.5 h-24 bg-gradient-to-b from-neon-cyan to-neon-purple transform -translate-x-1/2 z-0">
                  <div className="absolute top-0 left-1/2 w-2 h-2 bg-neon-cyan rounded-full transform -translate-x-1/2 animate-pulse"></div>
                  <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-neon-purple rounded-full transform -translate-x-1/2 animate-pulse" style={{animationDelay: '0.5s'}}></div>
                </div>
              )}

              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                
                {/* Content side */}
                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  {/* Step number and title */}
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="flex-shrink-0">
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${step.color} p-0.5 animate-glow-pulse`}>
                        <div className="w-full h-full rounded-full bg-dark-future flex items-center justify-center">
                          <span className="text-2xl font-bold text-white">{step.number}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                        {step.title}
                      </h3>
                      <p className="text-lg text-gray-subtle">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Details checklist */}
                  <div className="space-y-3">
                    {step.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-center space-x-3 p-3 rounded-lg bg-card/30 backdrop-blur-sm border border-neon-cyan/20 hover:border-neon-cyan/40">
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                        <span className="text-white">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Visual side */}
                <div className={`relative ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="relative bg-card/50 backdrop-blur-sm rounded-2xl p-8 border-2 border-transparent hover:border-neon-cyan/50">
                    {/* Icon */}
                    <div className={`w-24 h-24 rounded-2xl bg-gradient-to-r ${step.color} p-1 mx-auto mb-6 animate-glow-pulse group-hover:animate-circuit-float`}>
                      <div className="w-full h-full rounded-2xl bg-dark-future flex items-center justify-center">
                        <step.icon className="w-12 h-12 text-white" />
                      </div>
                    </div>

                    {/* Mock interface based on step */}
                    <div className="space-y-4">
                      {step.number === 1 && (
                        <div className="bg-dark-future/80 rounded-xl p-4 border border-neon-cyan/30">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-neon-cyan font-medium">Telegram Bot</span>
                            <span className="text-green-400 text-sm">Faol</span>
                          </div>
                          <div className="text-white text-sm">@FuturecoinBot bilan bog'lanish...</div>
                        </div>
                      )}

                      {step.number === 2 && (
                        <div className="text-center">
                          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple mx-auto mb-4 flex items-center justify-center text-dark-future font-bold animate-glow-pulse cursor-pointer">
                            TAP
                          </div>
                          <div className="text-neon-cyan font-medium">+125 FUT</div>
                          <div className="text-gray-subtle text-sm">+50 XP</div>
                        </div>
                      )}

                      {step.number === 3 && (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 bg-dark-future/80 rounded-lg border border-neon-cyan/30">
                            <span className="text-white">Balance:</span>
                            <span className="text-neon-cyan font-bold">125,847 FUT</span>
                          </div>
                          <div className="text-center">
                            <button className="bg-gradient-to-r from-green-400 to-neon-cyan text-dark-future font-semibold px-6 py-2 rounded-full">
                              Claim Tokens
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Floating elements */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-neon-cyan/30 rounded-full animate-circuit-float"></div>
                    <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-neon-purple/30 rounded-full animate-circuit-float" style={{animationDelay: '0.7s'}}></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 animate-slide-in-up" style={{animationDelay: '0.8s'}}>
          <div className="bg-gradient-to-r from-neon-cyan/10 to-neon-purple/10 rounded-2xl p-8 border border-neon-cyan/30 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Tayyor bo'ldingizmi?
            </h3>
            <p className="text-gray-subtle mb-6">
              Hoziroq boshlang va birinchi tokenlaringizni yig'ing!
            </p>
            <button className="bg-gradient-to-r from-neon-cyan to-neon-purple hover:from-neon-purple hover:to-neon-cyan text-dark-future font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 animate-glow-pulse inline-flex items-center">
              Hozir boshlash
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowToClaim;
