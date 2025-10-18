import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BookHeart, 
  GraduationCap, 
  HandHeart, 
  Calendar, 
  Users2, 
  MessageCircle,
  ArrowRight
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Services = () => {
  const { t } = useTranslation();
  
  const services = [
    {
      icon: BookHeart,
      title: t('services.spiritualGuidance.title'),
      description: t('services.spiritualGuidance.description'),
      features: t('services.spiritualGuidance.features', { returnObjects: true }) as string[],
      color: 'sage'
    },
    {
      icon: HandHeart,
      title: t('services.socialActions.title'),
      description: t('services.socialActions.description'),
      features: t('services.socialActions.features', { returnObjects: true }) as string[],
      color: 'gold'
    },
    {
      icon: GraduationCap,
      title: t('services.education.title'),
      description: t('services.education.description'),
      features: t('services.education.features', { returnObjects: true }) as string[],
      color: 'sage'
    },
    {
      icon: Calendar,
      title: t('services.events.title'),
      description: t('services.events.description'),
      features: t('services.events.features', { returnObjects: true }) as string[],
      color: 'gold'
    }
  ];

  const stats = [
    { number: '500+', label: t('services.stats.familiesHelped'), icon: HandHeart },
    { number: '1200+', label: t('services.stats.studentsSupported'), icon: GraduationCap },
    { number: '50+', label: t('services.stats.annualEvents'), icon: Calendar },
    { number: '24/7', label: t('services.stats.spiritualGuidance'), icon: MessageCircle }
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-sage-light/10 to-gold-light/10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-sage mb-4">{t('services.title')}</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-sage to-gold mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <Card 
              key={service.title}
              className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${
                    service.color === 'sage' ? 'from-sage to-sage-dark' : 'from-gold to-gold-dark'
                  } rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-sage mb-3">{service.title}</h3>
                    <p className="text-muted-foreground mb-4">{service.description}</p>
                    
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-gradient-to-r from-sage to-gold rounded-full mr-3"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 mb-16">
          <h3 className="text-2xl font-bold text-sage text-center mb-8">{t('services.title')}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-sage to-gold rounded-lg mb-3 mx-auto">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-sage mb-1">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-sage to-gold rounded-3xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">{t('services.getInvolved')}</h3>
            <p className="mb-6 opacity-90">
              {t('services.subtitle')}
            </p>
            <Button
              variant="secondary"
              size="lg"
              className="bg-white text-sage hover:bg-white/90"
              onClick={() => scrollToSection('#contact')}
            >
              {t('nav.contact')}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;