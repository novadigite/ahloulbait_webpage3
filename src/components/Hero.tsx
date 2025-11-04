import { Button } from '@/components/ui/button';
import { ArrowRight, Users, Calendar, Heart, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t } = useTranslation();
  
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="accueil" className="min-h-screen pt-20 relative overflow-hidden">
      {/* Background with enhanced effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-dark/80 via-sage/70 to-emerald/60 z-10 animate-fade-in"></div>
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-gold/10 via-transparent to-emerald/10 z-10 animate-shimmer"></div>
        {/* Enhanced floating particles with varied sizes */}
        <div className="absolute inset-0 z-20">
          <div className="absolute top-20 left-10 w-2 h-2 bg-gold rounded-full animate-float opacity-60 shadow-gold"></div>
          <div className="absolute top-40 right-20 w-3 h-3 bg-gold/50 rounded-full animate-float shadow-lg shadow-gold/50" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-40 left-20 w-1 h-1 bg-gold rounded-full animate-float" style={{animationDelay: '4s'}}></div>
          <div className="absolute bottom-20 right-10 w-2 h-2 bg-gold/70 rounded-full animate-float shadow-gold" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/4 w-1.5 h-1.5 bg-emerald/60 rounded-full animate-float" style={{animationDelay: '3s'}}></div>
          <div className="absolute top-3/4 right-1/3 w-2 h-2 bg-gold/40 rounded-full animate-float shadow-gold" style={{animationDelay: '5s'}}></div>
          <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-emerald rounded-full animate-float" style={{animationDelay: '6s'}}></div>
        </div>
      </div>
      
      <div className="container mx-auto px-6 py-20 relative z-30">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-4 animate-fade-in-left" style={{animationDelay: '0.2s'}}>
                <Sparkles className="w-8 h-8 text-gold animate-glow animate-pulse" />
                <div className="w-16 h-0.5 bg-gradient-to-r from-gold via-gold-light to-transparent animate-shimmer"></div>
              </div>
              <h1 className="text-5xl lg:text-7xl font-playfair font-bold text-white leading-tight animate-scale-in drop-shadow-2xl" style={{animationDelay: '0.3s'}}>
                {t('hero.title')}
              </h1>
              <p className="text-xl lg:text-2xl text-gold-light font-inter font-medium animate-fade-in-up" style={{animationDelay: '0.5s'}}>
                {t('hero.subtitle')}
              </p>
            </div>

            <div className="relative group animate-fade-in-up" style={{animationDelay: '0.7s'}}>
              <div className="absolute inset-0 bg-gradient-to-r from-gold/30 via-emerald/20 to-gold/30 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-500 animate-shimmer"></div>
              <div className="relative bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/30 group-hover:border-gold/50 transition-all duration-500 hover:scale-[1.02]">
                <h2 className="text-2xl lg:text-3xl font-playfair font-bold italic text-white animate-bounce-gentle">
                  "{t('hero.slogan')}"
                </h2>
              </div>
            </div>

            <p className="text-lg text-white/90 leading-relaxed font-inter animate-fade-in-up bg-black/20 backdrop-blur-md rounded-lg p-4 border border-white/10 hover:border-white/20 transition-all duration-300" style={{animationDelay: '0.9s'}}>
              {t('hero.description')}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 py-6 animate-fade-in-up" style={{animationDelay: '1.1s'}}>
              <div className="text-center group animate-fade-in-up" style={{animationDelay: '1.2s'}}>
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald/30 to-gold/20 backdrop-blur-md rounded-xl mb-3 mx-auto border border-white/30 group-hover:scale-110 group-hover:shadow-gold transition-all duration-500 group-hover:rotate-3 shadow-lg">
                  <Users className="w-8 h-8 text-gold animate-glow group-hover:animate-pulse" />
                </div>
                <div className="text-3xl font-playfair font-bold text-white animate-bounce-gentle">45K+</div>
                <div className="text-sm text-white/80 font-inter">{t('hero.followers')}</div>
              </div>
              <div className="text-center group animate-fade-in-up" style={{animationDelay: '1.3s'}}>
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gold/30 to-emerald/20 backdrop-blur-md rounded-xl mb-3 mx-auto border border-white/30 group-hover:scale-110 group-hover:shadow-gold transition-all duration-500 group-hover:-rotate-3 shadow-lg">
                  <Calendar className="w-8 h-8 text-gold animate-glow group-hover:animate-pulse" />
                </div>
                <div className="text-3xl font-playfair font-bold text-white animate-bounce-gentle" style={{animationDelay: '0.5s'}}>2010</div>
                <div className="text-sm text-white/80 font-inter">{t('hero.founded')}</div>
              </div>
              <div className="text-center group animate-fade-in-up" style={{animationDelay: '1.4s'}}>
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald/30 to-gold/20 backdrop-blur-md rounded-xl mb-3 mx-auto border border-white/30 group-hover:scale-110 group-hover:shadow-gold transition-all duration-500 group-hover:rotate-3 shadow-lg">
                  <Heart className="w-8 h-8 text-gold animate-glow group-hover:animate-pulse" />
                </div>
                <div className="text-3xl font-playfair font-bold text-white animate-bounce-gentle" style={{animationDelay: '1s'}}>1</div>
                <div className="text-sm text-white/80 font-inter">{t('hero.community')}</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-fade-in-up" style={{animationDelay: '1.5s'}}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald to-sage hover:from-emerald-dark hover:to-sage-dark text-white group shadow-floating hover:shadow-gold transition-all duration-500 hover:scale-105 font-inter font-medium relative overflow-hidden"
                onClick={() => scrollToSection('#mission')}
              >
                <span className="relative z-10">{t('hero.discoverMission')}</span>
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300 relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-gold text-gold hover:bg-gold hover:text-white backdrop-blur-md bg-white/10 hover:scale-105 transition-all duration-500 font-inter font-medium hover:shadow-gold relative overflow-hidden group"
                onClick={() => window.open(`https://wa.me/2550757875302?text=${encodeURIComponent(t('whatsapp.message'))}`, '_blank')}
              >
                <span className="relative z-10">{t('nav.joinUs')}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </Button>
            </div>
          </div>

          {/* Visual Element */}
          <div className="relative animate-scale-in lg:animate-float" style={{animationDelay: '0.4s'}}>
            <div className="relative">
              {/* Enhanced glowing background */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald/40 via-gold/30 to-emerald/40 rounded-3xl blur-3xl animate-glow"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-transparent rounded-3xl blur-2xl animate-shimmer"></div>
              
              {/* Main card */}
              <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-floating border border-white/30 hover:border-gold/50 transition-all duration-500 group hover:shadow-gold">
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="w-28 h-28 bg-gradient-to-br from-emerald via-sage to-gold rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-500 animate-rotate-slow shadow-gold group-hover:shadow-elegant relative overflow-hidden">
                      <Heart className="w-14 h-14 text-white animate-glow relative z-10" />
                      <div className="absolute inset-0 bg-gradient-to-tr from-gold/30 to-transparent animate-shimmer"></div>
                    </div>
                    <h3 className="text-2xl font-playfair font-bold text-white mb-3 group-hover:text-gold-light transition-colors duration-300">{t('hero.spiritualityAndSolidarity')}</h3>
                    <p className="text-white/80 font-inter">
                      {t('hero.unitedCommunity')}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-6">
                    <div className="text-center p-4 bg-gradient-to-br from-emerald/30 to-transparent backdrop-blur-md rounded-xl border border-white/20 hover:border-gold/40 transition-all duration-500 hover:scale-105 group/item hover:shadow-lg relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-tr from-gold/10 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-500"></div>
                      <div className="text-lg font-playfair font-bold text-gold group-hover/item:animate-bounce-gentle relative z-10">{t('hero.prayers')}</div>
                      <div className="text-sm text-white/70 font-inter relative z-10">{t('hero.daily')}</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-gold/30 to-transparent backdrop-blur-md rounded-xl border border-white/20 hover:border-emerald/40 transition-all duration-500 hover:scale-105 group/item hover:shadow-lg relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-tr from-emerald/10 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-500"></div>
                      <div className="text-lg font-playfair font-bold text-gold group-hover/item:animate-bounce-gentle relative z-10">{t('hero.training')}</div>
                      <div className="text-sm text-white/70 font-inter relative z-10">{t('hero.continuous')}</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-gold/30 to-transparent backdrop-blur-md rounded-xl border border-white/20 hover:border-emerald/40 transition-all duration-500 hover:scale-105 group/item hover:shadow-lg relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-tr from-emerald/10 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-500"></div>
                      <div className="text-lg font-playfair font-bold text-gold group-hover/item:animate-bounce-gentle relative z-10">{t('hero.help')}</div>
                      <div className="text-sm text-white/70 font-inter relative z-10">{t('hero.social')}</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-emerald/30 to-transparent backdrop-blur-md rounded-xl border border-white/20 hover:border-gold/40 transition-all duration-500 hover:scale-105 group/item hover:shadow-lg relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-tr from-gold/10 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-500"></div>
                      <div className="text-lg font-playfair font-bold text-gold group-hover/item:animate-bounce-gentle relative z-10">{t('hero.peace')}</div>
                      <div className="text-sm text-white/70 font-inter relative z-10">{t('hero.lasting')}</div>
                    </div>
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