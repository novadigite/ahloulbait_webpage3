import { Button } from '@/components/ui/button';
import { ArrowRight, Users, Calendar, Heart, Sparkles, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

const Hero = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Generate random sparkles
  const sparkles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: `${Math.random() * 4}s`,
    size: Math.random() * 8 + 4,
  }));

  return (
    <section id="accueil" className="min-h-screen pt-20 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-dark via-sage to-emerald animate-gradient-shift bg-[length:200%_200%] z-10"></div>
        
        {/* Morphing blob shapes */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-gold/30 to-emerald/20 rounded-full blur-3xl animate-morph opacity-60"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-tl from-emerald/40 to-gold/20 rounded-full blur-3xl animate-morph opacity-50" style={{animationDelay: '4s'}}></div>
        
        {/* Floating sparkles */}
        <div className="absolute inset-0 z-20">
          {sparkles.map((sparkle) => (
            <div
              key={sparkle.id}
              className="absolute animate-sparkle"
              style={{
                left: sparkle.left,
                top: sparkle.top,
                animationDelay: sparkle.delay,
              }}
            >
              <Star className="text-gold/70" style={{ width: sparkle.size, height: sparkle.size }} fill="currentColor" />
            </div>
          ))}
        </div>

        {/* Animated particles with trails */}
        <div className="absolute inset-0 z-20">
          <div className="absolute top-20 left-10 w-3 h-3 bg-gold rounded-full animate-float-rotate opacity-80 shadow-lg shadow-gold/50"></div>
          <div className="absolute top-40 right-20 w-4 h-4 bg-gold/60 rounded-full animate-float shadow-xl shadow-gold/40" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-40 left-20 w-2 h-2 bg-gold rounded-full animate-float-rotate" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-20 right-10 w-3 h-3 bg-gold/70 rounded-full animate-float shadow-gold" style={{animationDelay: '3s'}}></div>
          <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-emerald-light/80 rounded-full animate-float-rotate" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute top-3/4 right-1/3 w-3 h-3 bg-gold/50 rounded-full animate-float shadow-gold" style={{animationDelay: '2.5s'}}></div>
        </div>

        {/* Ripple effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-15">
          <div className="w-64 h-64 border border-gold/20 rounded-full animate-ripple"></div>
          <div className="absolute inset-0 w-64 h-64 border border-gold/20 rounded-full animate-ripple" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute inset-0 w-64 h-64 border border-gold/20 rounded-full animate-ripple" style={{animationDelay: '1s'}}></div>
        </div>
      </div>
      
      <div className="container mx-auto px-6 py-20 relative z-30">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-4 animate-slide-in-blur" style={{animationDelay: '0.2s'}}>
                <div className="relative">
                  <Sparkles className="w-8 h-8 text-gold animate-pulse-glow" />
                  <div className="absolute inset-0 w-8 h-8 bg-gold/20 rounded-full blur-md animate-pulse"></div>
                </div>
                <div className="w-20 h-1 bg-gradient-to-r from-gold via-gold-light to-transparent rounded-full animate-shimmer"></div>
              </div>
              
              {/* Title with shimmer effect */}
              <h1 
                className="text-5xl lg:text-7xl font-playfair font-bold leading-tight animate-zoom-fade drop-shadow-2xl" 
                style={{animationDelay: '0.3s'}}
              >
                <span className="bg-gradient-to-r from-white via-gold-light to-white bg-[length:200%_auto] animate-text-shimmer bg-clip-text text-transparent">
                  {t('hero.title')}
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-gold-light font-inter font-medium animate-slide-in-blur" style={{animationDelay: '0.5s'}}>
                {t('hero.subtitle')}
              </p>
            </div>

            {/* Slogan card with enhanced effects */}
            <div className="relative group animate-zoom-fade" style={{animationDelay: '0.7s'}}>
              <div className="absolute -inset-1 bg-gradient-to-r from-gold via-emerald to-gold rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-all duration-500 animate-gradient-shift bg-[length:200%_200%]"></div>
              <div className="relative bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/30 group-hover:border-gold/60 transition-all duration-500 hover:scale-[1.02] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-gold/10 via-transparent to-emerald/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <h2 className="text-2xl lg:text-3xl font-playfair font-bold italic text-white relative z-10">
                  "{t('hero.slogan')}"
                </h2>
              </div>
            </div>

            <p className="text-lg text-white/90 leading-relaxed font-inter animate-slide-in-blur bg-black/20 backdrop-blur-md rounded-xl p-5 border border-white/10 hover:border-white/25 transition-all duration-300 hover:bg-black/30" style={{animationDelay: '0.9s'}}>
              {t('hero.description')}
            </p>

            {/* Stats with staggered animations */}
            <div className="grid grid-cols-3 gap-6 py-6">
              {[
                { icon: Users, value: '45K+', label: t('hero.followers'), delay: '1s' },
                { icon: Calendar, value: '2010', label: t('hero.founded'), delay: '1.1s' },
                { icon: Heart, value: '1', label: t('hero.community'), delay: '1.2s' },
              ].map((stat, index) => (
                <div 
                  key={index}
                  className="text-center group animate-zoom-fade" 
                  style={{animationDelay: stat.delay}}
                >
                  <div className="relative">
                    <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald/40 to-gold/30 backdrop-blur-md rounded-2xl mb-3 mx-auto border border-white/30 group-hover:scale-110 transition-all duration-500 group-hover:rotate-6 shadow-xl animate-pulse-glow">
                      <stat.icon className="w-8 h-8 text-gold" />
                    </div>
                    <div className="absolute inset-0 w-16 h-16 mx-auto bg-gold/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="text-3xl font-playfair font-bold text-white group-hover:text-gold-light transition-colors duration-300">{stat.value}</div>
                  <div className="text-sm text-white/80 font-inter">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTA Buttons with enhanced effects */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-slide-in-blur" style={{animationDelay: '1.3s'}}>
              <Button
                size="lg"
                className="relative bg-gradient-to-r from-emerald to-sage hover:from-emerald-dark hover:to-sage-dark text-white group shadow-xl transition-all duration-500 hover:scale-105 font-inter font-medium overflow-hidden animate-pulse-glow"
                onClick={() => scrollToSection('#mission')}
              >
                <span className="relative z-10 flex items-center">
                  {t('hero.discoverMission')}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-gold/30 via-transparent to-gold/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer"></div>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-gold text-gold hover:bg-gold hover:text-white backdrop-blur-md bg-white/10 hover:scale-105 transition-all duration-500 font-inter font-medium relative overflow-hidden group"
                onClick={() => window.open(`https://wa.me/2550757875302?text=${encodeURIComponent(t('whatsapp.message'))}`, '_blank')}
              >
                <span className="relative z-10">{t('nav.joinUs')}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </Button>
            </div>
          </div>

          {/* Visual Element with enhanced animations */}
          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="relative animate-float-rotate">
              {/* Multiple glowing layers */}
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald/50 via-gold/40 to-emerald/50 rounded-3xl blur-3xl animate-pulse opacity-60"></div>
              <div className="absolute -inset-2 bg-gradient-to-br from-gold/30 to-transparent rounded-3xl blur-2xl animate-morph"></div>
              
              {/* Main card */}
              <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/30 hover:border-gold/50 transition-all duration-500 group overflow-hidden">
                {/* Animated background pattern */}
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gold/20 via-transparent to-emerald/20 animate-gradient-shift bg-[length:200%_200%]"></div>
                </div>
                
                <div className="space-y-6 relative z-10">
                  <div className="text-center">
                    {/* Animated heart icon */}
                    <div className="relative w-32 h-32 mx-auto mb-6">
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald via-sage to-gold rounded-full animate-morph"></div>
                      <div className="absolute inset-2 bg-gradient-to-br from-emerald-dark via-sage-dark to-gold-dark rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                        <Heart className="w-14 h-14 text-white animate-bounce-gentle" fill="currentColor" />
                      </div>
                      <div className="absolute -inset-2 bg-gold/30 rounded-full blur-xl animate-pulse opacity-60"></div>
                    </div>
                    
                    <h3 className="text-2xl font-playfair font-bold text-white mb-3 group-hover:text-gold-light transition-colors duration-300">
                      {t('hero.spiritualityAndSolidarity')}
                    </h3>
                    <p className="text-white/80 font-inter">
                      {t('hero.unitedCommunity')}
                    </p>
                  </div>

                  {/* Grid items with hover effects */}
                  <div className="grid grid-cols-2 gap-4 pt-6">
                    {[
                      { title: t('hero.prayers'), subtitle: t('hero.daily'), gradient: 'from-emerald/40 to-gold/20' },
                      { title: t('hero.training'), subtitle: t('hero.continuous'), gradient: 'from-gold/40 to-emerald/20' },
                      { title: t('hero.help'), subtitle: t('hero.social'), gradient: 'from-gold/40 to-emerald/20' },
                      { title: t('hero.peace'), subtitle: t('hero.lasting'), gradient: 'from-emerald/40 to-gold/20' },
                    ].map((item, index) => (
                      <div 
                        key={index}
                        className={`text-center p-4 bg-gradient-to-br ${item.gradient} backdrop-blur-md rounded-xl border border-white/20 hover:border-gold/50 transition-all duration-500 hover:scale-105 group/item relative overflow-hidden`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-tr from-gold/20 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-500"></div>
                        <div className="text-lg font-playfair font-bold text-gold relative z-10 group-hover/item:scale-110 transition-transform duration-300">
                          {item.title}
                        </div>
                        <div className="text-sm text-white/70 font-inter relative z-10">{item.subtitle}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;