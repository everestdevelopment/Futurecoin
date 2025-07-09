
import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Aziz Rahimov",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      text: "Futurecoin meni TON dunyosiga olib kirdi! Har kuni tokenlar topaman va bu juda qiziq.",
      rating: 5,
      location: "Toshkent"
    },
    {
      name: "Malika Karimova",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b400?w=100&h=100&fit=crop&crop=face",
      text: "Oddiy o'yin deb o'ylagandim, lekin haqiqiy tokenlar olish imkoniyati bor ekan! Referrallarim ham ko'p token topishyapti.",
      rating: 5,
      location: "Samarqand"
    },
    {
      name: "Bobur Aliyev",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      text: "Telegram ichida ishlagani juda qulay. Hech narsa o'rnatish shart emas, faqat bosing va token oling!",
      rating: 5,
      location: "Farg'ona"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-dark-future/90 to-dark-future relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-neon-cyan/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-neon-purple/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-radial from-neon-cyan/3 to-transparent rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-slide-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Foydalanuvchilar sharhlari</span>
          </h2>
          <p className="text-xl text-gray-subtle max-w-2xl mx-auto">
            Minglab foydalanuvchilar Futurecoin bilan muvaffaqiyat qozonishmoqda
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="relative group cursor-pointer transition-all duration-500 hover:scale-105 bg-card/80 backdrop-blur-sm border-2 border-transparent hover:border-neon-cyan/50 animate-slide-in-up"
              style={{animationDelay: `${index * 0.2}s`}}
            >
              <CardContent className="p-8 relative">
                {/* Quote icon */}
                <div className="absolute top-4 right-4 opacity-20">
                  <Quote className="w-8 h-8 text-neon-cyan" />
                </div>

                {/* Avatar and info */}
                <div className="flex items-center mb-6">
                  <div className="relative">
                    <img 
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full border-2 border-neon-cyan/50"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-neon-cyan to-neon-purple rounded-full flex items-center justify-center">
                      <Star className="w-3 h-3 text-dark-future" fill="currentColor" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-white text-lg">{testimonial.name}</h4>
                    <p className="text-gray-subtle text-sm">{testimonial.location}</p>
                  </div>
                </div>

                {/* Review text */}
                <p className="text-gray-subtle text-lg leading-relaxed mb-6 italic">
                  "{testimonial.text}"
                </p>

                {/* Rating */}
                <div className="flex items-center justify-between">
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star 
                        key={i} 
                        className="w-5 h-5 text-yellow-400" 
                        fill="currentColor"
                      />
                    ))}
                  </div>
                  <div className="text-sm text-neon-cyan font-medium">
                    Tasdiqlangan foydalanuvchi
                  </div>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-neon-cyan/5 to-neon-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom stats */}
        <div className="mt-16 text-center animate-slide-in-up" style={{animationDelay: '0.6s'}}>
          <div className="inline-flex items-center space-x-8 bg-card/30 backdrop-blur-sm rounded-full px-8 py-4 border border-neon-cyan/20">
            <div className="text-center">
              <div className="text-2xl font-bold gradient-text">4.9</div>
              <div className="text-sm text-gray-subtle">O'rtacha baho</div>
            </div>
            <div className="w-px h-12 bg-neon-cyan/20"></div>
            <div className="text-center">
              <div className="text-2xl font-bold gradient-text">50K+</div>
              <div className="text-sm text-gray-subtle">Ijobiy sharhlar</div>
            </div>
            <div className="w-px h-12 bg-neon-cyan/20"></div>
            <div className="text-center">
              <div className="text-2xl font-bold gradient-text">95%</div>
              <div className="text-sm text-gray-subtle">Tavsiya qilishadi</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
