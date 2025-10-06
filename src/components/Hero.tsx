import { Button } from '@/components/ui/button';
import { ArrowRight, Users, Calendar, Heart, Sparkles } from 'lucide-react';
import cheikhBanner from '@/assets/cheikh-banner.jpg';

const Hero = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="accueil" className="min-h-screen pt-20 relative overflow-hidden">
      {/* Background with vitrine image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-dark/80 via-sage/70 to-emerald/60 z-10"></div>
        <img 
          src={cheikhBanner} 
          alt="AHLOUL BAIT Community" 
          className="w-full h-full object-cover opacity-30"
        />
        {/* Floating particles */}
        <div className="absolute inset-0 z-20">
          <div className="absolute top-20 left-10 w-2 h-2 bg-gold rounded-full animate-float opacity-60"></div>
          <div className="absolute top-40 right-20 w-3 h-3 bg-gold/50 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-40 left-20 w-1 h-1 bg-gold rounded-full animate-float" style={{animationDelay: '4s'}}></div>
          <div className="absolute bottom-20 right-10 w-2 h-2 bg-gold/70 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
        </div>
      </div>
      
      <div className="container mx-auto px-6 py-20 relative z-30">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-4">
                <Sparkles className="w-8 h-8 text-gold animate-glow" />
                <div className="w-16 h-0.5 bg-gradient-to-r from-gold to-transparent"></div>
              </div>
              <h1 className="text-5xl lg:text-7xl font-playfair font-bold text-white leading-tight animate-scale-in drop-shadow-lg">
                AHLOUL BAIT
              </h1>
              <p className="text-xl lg:text-2xl text-gold-light font-inter font-medium animate-slide-up">
                Communauté Tidjaniya - Côte d'Ivoire
              </p>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-gold/20 to-emerald/20 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <h2 className="text-2xl lg:text-3xl font-playfair font-bold italic text-white animate-bounce-gentle">
                  "Unir les cœurs, élever les âmes, servir la communauté"
                </h2>
              </div>
            </div>

            <p className="text-lg text-white/90 leading-relaxed font-inter animate-fade-in bg-black/20 backdrop-blur-sm rounded-lg p-4 border border-white/10">
              Organisation religieuse et sociale à caractère apolitique, 
              guidée par Cheikh Ahmad Tidjani Diabaté. Enregistrée officiellement 
              en Côte d'Ivoire depuis 2010, nous rassemblons une communauté 
              spirituelle de 45 000 followers unis dans la paix et la solidarité.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 py-6">
              <div className="text-center group">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald/20 to-gold/20 backdrop-blur-sm rounded-xl mb-3 mx-auto border border-white/20 group-hover:scale-110 transition-all duration-300 group-hover:rotate-3">
                  <Users className="w-8 h-8 text-gold animate-glow" />
                </div>
                <div className="text-3xl font-playfair font-bold text-white animate-bounce-gentle">45K+</div>
                <div className="text-sm text-white/80 font-inter">Followers</div>
              </div>
              <div className="text-center group">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gold/20 to-emerald/20 backdrop-blur-sm rounded-xl mb-3 mx-auto border border-white/20 group-hover:scale-110 transition-all duration-300 group-hover:-rotate-3">
                  <Calendar className="w-8 h-8 text-gold animate-glow" />
                </div>
                <div className="text-3xl font-playfair font-bold text-white animate-bounce-gentle" style={{animationDelay: '0.5s'}}>2010</div>
                <div className="text-sm text-white/80 font-inter">Création</div>
              </div>
              <div className="text-center group">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald/20 to-gold/20 backdrop-blur-sm rounded-xl mb-3 mx-auto border border-white/20 group-hover:scale-110 transition-all duration-300 group-hover:rotate-3">
                  <Heart className="w-8 h-8 text-gold animate-glow" />
                </div>
                <div className="text-3xl font-playfair font-bold text-white animate-bounce-gentle" style={{animationDelay: '1s'}}>1</div>
                <div className="text-sm text-white/80 font-inter">Communauté</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald to-sage hover:from-emerald-dark hover:to-sage-dark text-white group shadow-floating hover:shadow-elegant transition-all duration-300 hover:scale-105 font-inter font-medium"
                onClick={() => scrollToSection('#mission')}
              >
                Découvrir notre mission
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-gold text-gold hover:bg-gold hover:text-white backdrop-blur-sm bg-white/10 hover:scale-105 transition-all duration-300 font-inter font-medium"
                onClick={() => window.open('https://wa.me/2550757875302?text=Bonjour,%20je%20viens%20de%20votre%20site%20Internet.%20Je%20souhaite%20rejoindre%20la%20communauté%20AHLOUL%20BAIT%20Tidjaniya.', '_blank')}
              >
                Nous rejoindre
              </Button>
            </div>
          </div>

          {/* Visual Element */}
          <div className="relative animate-scale-in lg:animate-float">
            <div className="relative">
              {/* Glowing background */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald/30 to-gold/30 rounded-3xl blur-3xl animate-glow"></div>
              
              {/* Main card */}
              <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8shadow-floating border border-white/20 hover:border-gold/40 transition-all duration-500 group">
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="w-28 h-28 bg-gradient-to-br from-emerald via-sage to-gold rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 animate-rotate-slow shadow-gold">
                      <Heart className="w-14 h-14 text-white animate-glow" />
                    </div>
                    <h3 className="text-2xl font-playfair font-bold text-white mb-3">Spiritualité & Solidarité</h3>
                    <p className="text-white/80 font-inter">
                      Une communauté unie dans la foi et l'entraide
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-6">
                    <div className="text-center p-4 bg-gradient-to-br from-emerald/20 to-transparent backdrop-blur-sm rounded-xl border border-white/10 hover:border-gold/30 transition-all duration-300 hover:scale-105 group/item">
                      <div className="text-lg font-playfair font-bold text-gold group-hover/item:animate-bounce-gentle">Prières</div>
                      <div className="text-sm text-white/70 font-inter">Quotidiennes</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-gold/20 to-transparent backdrop-blur-sm rounded-xl border border-white/10 hover:border-emerald/30 transition-all duration-300 hover:scale-105 group/item">
                      <div className="text-lg font-playfair font-bold text-gold group-hover/item:animate-bounce-gentle">Formation</div>
                      <div className="text-sm text-white/70 font-inter">Continue</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-gold/20 to-transparent backdrop-blur-sm rounded-xl border border-white/10 hover:border-emerald/30 transition-all duration-300 hover:scale-105 group/item">
                      <div className="text-lg font-playfair font-bold text-gold group-hover/item:animate-bounce-gentle">Aide</div>
                      <div className="text-sm text-white/70 font-inter">Sociale</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-emerald/20 to-transparent backdrop-blur-sm rounded-xl border border-white/10 hover:border-gold/30 transition-all duration-300 hover:scale-105 group/item">
                      <div className="text-lg font-playfair font-bold text-gold group-hover/item:animate-bounce-gentle">Paix</div>
                      <div className="text-sm text-white/70 font-inter">Durable</div>
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