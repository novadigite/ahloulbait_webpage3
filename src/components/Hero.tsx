import { Button } from '@/components/ui/button';
import { ArrowRight, Users, Calendar, Heart } from 'lucide-react';

const Hero = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="accueil" className="min-h-screen pt-20 bg-gradient-to-br from-sage-light via-white to-gold-light">
      <div className="container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-sage leading-tight">
                AHLOUL BAIT
              </h1>
              <p className="text-xl text-sage-dark font-medium">
                Communauté Tidjaniya - Côte d'Ivoire
              </p>
            </div>

            <div className="bg-gradient-to-r from-sage to-gold bg-clip-text text-transparent">
              <h2 className="text-2xl lg:text-3xl font-bold italic">
                "Unir les cœurs, élever les âmes, servir la communauté"
              </h2>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Organisation religieuse et sociale à caractère apolitique, 
              guidée par Cheikh Ahmad Tidjani Diabaté. Enregistrée officiellement 
              en Côte d'Ivoire depuis 2010, nous rassemblons une communauté 
              spirituelle de 45 000 followers unis dans la paix et la solidarité.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 py-6">
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-sage/10 rounded-lg mb-2 mx-auto">
                  <Users className="w-6 h-6 text-sage" />
                </div>
                <div className="text-2xl font-bold text-sage">45K+</div>
                <div className="text-sm text-muted-foreground">Followers</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-gold/10 rounded-lg mb-2 mx-auto">
                  <Calendar className="w-6 h-6 text-gold" />
                </div>
                <div className="text-2xl font-bold text-sage">2010</div>
                <div className="text-sm text-muted-foreground">Création</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-sage/10 rounded-lg mb-2 mx-auto">
                  <Heart className="w-6 h-6 text-sage" />
                </div>
                <div className="text-2xl font-bold text-sage">1</div>
                <div className="text-sm text-muted-foreground">Communauté</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-sage hover:bg-sage-dark text-white group"
                onClick={() => scrollToSection('#mission')}
              >
                Découvrir notre mission
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-sage text-sage hover:bg-sage hover:text-white"
                onClick={() => scrollToSection('#contact')}
              >
                Nous rejoindre
              </Button>
            </div>
          </div>

          {/* Visual Element */}
          <div className="relative animate-scale-in">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-sage/20 to-gold/20 rounded-3xl blur-2xl"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-sage to-gold rounded-full flex items-center justify-center mx-auto mb-4">
                      <Heart className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-sage mb-2">Spiritualité & Solidarité</h3>
                    <p className="text-muted-foreground">
                      Une communauté unie dans la foi et l'entraide
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="text-center p-4 bg-sage-light/50 rounded-xl">
                      <div className="text-lg font-bold text-sage">Prières</div>
                      <div className="text-sm text-muted-foreground">Quotidiennes</div>
                    </div>
                    <div className="text-center p-4 bg-gold-light/50 rounded-xl">
                      <div className="text-lg font-bold text-sage">Formation</div>
                      <div className="text-sm text-muted-foreground">Continue</div>
                    </div>
                    <div className="text-center p-4 bg-gold-light/50 rounded-xl">
                      <div className="text-lg font-bold text-sage">Aide</div>
                      <div className="text-sm text-muted-foreground">Sociale</div>
                    </div>
                    <div className="text-center p-4 bg-sage-light/50 rounded-xl">
                      <div className="text-lg font-bold text-sage">Paix</div>
                      <div className="text-sm text-muted-foreground">Durable</div>
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