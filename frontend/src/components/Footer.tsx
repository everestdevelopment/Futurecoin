
import { Zap, Send, ExternalLink, Mail, Globe } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = [
    {
      title: "Loyiha",
      items: [
        { name: "Haqida", href: "#about" },
        { name: "Tokenomics", href: "#tokenomics" },
        { name: "Roadmap", href: "#roadmap" },
        { name: "FAQ", href: "#faq" }
      ]
    },
    {
      title: "Jamoa",
      items: [
        { name: "Blog", href: "#blog" },
        { name: "Yangiliklar", href: "#news" },
        { name: "Hamjamiyat", href: "#community" },
        { name: "Yordam", href: "#support" }
      ]
    },
    {
      title: "Hujjatlar",
      items: [
        { name: "Whitepaper", href: "#whitepaper" },
        { name: "API Docs", href: "#api" },
        { name: "Smart Contract", href: "#contract" },
        { name: "Audit hisoboti", href: "#audit" }
      ]
    }
  ];

  const socialLinks = [
    { name: "Telegram kanal", icon: Send, href: "https://t.me/futurecoin" },
    { name: "TON Explorer", icon: Globe, href: "https://tonscan.org" },
    { name: "Email", icon: Mail, href: "mailto:contact@futurecoin.xyz" }
  ];

  return (
    <footer className="bg-gradient-to-b from-dark-future/80 to-dark-future border-t border-neon-cyan/20 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-circuit-pattern opacity-5"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-neon-cyan/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-neon-purple/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Logo and description */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-purple p-0.5 animate-glow-pulse">
                <div className="w-full h-full rounded-xl bg-dark-future flex items-center justify-center">
                  <Zap className="w-6 h-6 text-neon-cyan" />
                </div>
              </div>
              <span className="text-2xl font-bold gradient-text">Futurecoin</span>
            </div>
            
            <p className="text-gray-subtle leading-relaxed">
              Telegram'da ishlaydigan eng kuchli click-to-earn o'yin. 
              Kelajak tokenlarini hoziroq yig'ishni boshlang!
            </p>

            {/* Social links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-card/50 backdrop-blur-sm border border-neon-cyan/20 hover:border-neon-cyan/50 flex items-center justify-center text-gray-subtle hover:text-neon-cyan transition-all duration-300 group"
                  title={social.name}
                >
                  <social.icon className="w-5 h-5 group-hover:animate-pulse" />
                </a>
              ))}
            </div>
          </div>

          {/* Links sections */}
          {links.map((section, index) => (
            <div key={index} className="space-y-6">
              <h3 className="text-lg font-semibold text-white">{section.title}</h3>
              <ul className="space-y-3">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <a
                      href={item.href}
                      className="text-gray-subtle hover:text-neon-cyan transition-colors duration-300 flex items-center group"
                    >
                      {item.name}
                      <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-neon-cyan/20 mb-8"></div>

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          
          {/* Copyright */}
          <div className="text-gray-subtle text-center md:text-left">
            © {currentYear} Futurecoin. Barcha huquqlar himoyalangan.
          </div>

          {/* Quick stats */}
          <div className="flex items-center space-x-8 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-gray-subtle">TON Network: Faol</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse"></div>
              <span className="text-gray-subtle">Smart Contract: Verified</span>
            </div>
          </div>

          {/* Additional links */}
          <div className="flex space-x-6 text-sm">
            <a href="#privacy" className="text-gray-subtle hover:text-neon-cyan transition-colors duration-300">
              Maxfiylik siyosati
            </a>
            <a href="#terms" className="text-gray-subtle hover:text-neon-cyan transition-colors duration-300">
              Foydalanish shartlari
            </a>
          </div>
        </div>

        {/* Final bottom banner */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-2 text-gray-subtle">
            <span>Built on</span>
            <span className="text-neon-cyan font-semibold">TON Blockchain</span>
            <span>with ❤️ for the community</span>
          </div>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-neon-cyan rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animation: `float ${Math.random() * 3 + 3}s ease-in-out infinite`
            }}
          />
        ))}
      </div>
    </footer>
  );
};

export default Footer;
