import { Card, CardContent } from '@/components/ui/card';
import { Heart, Users, BookOpen, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Mission = () => {
  const { t } = useTranslation();
  
  const missions = [
    {
      icon: Heart,
      title: t('mission.spirituality.title'),
      description: t('mission.spirituality.description'),
      gradient: 'from-sage to-sage-dark'
    },
    {
      icon: Users,
      title: t('mission.solidarity.title'),
      description: t('mission.solidarity.description'),
      gradient: 'from-gold to-gold-dark'
    },
    {
      icon: BookOpen,
      title: t('mission.transmission.title'),
      description: t('mission.transmission.description'),
      gradient: 'from-sage-dark to-sage'
    },
    {
      icon: Sparkles,
      title: t('mission.peace.title'),
      description: t('mission.peace.description'),
      gradient: 'from-gold-dark to-gold'
    }
  ];

  return (
    <section id="mission" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold text-sage mb-4">{t('mission.title')}</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-sage to-gold mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t('mission.description')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {missions.map((mission, index) => (
            <Card 
              key={mission.title} 
              className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-white to-sage-light/20 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8 text-center">
                <div className={`w-16 h-16 bg-gradient-to-br ${mission.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <mission.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-sage mb-4">{mission.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{mission.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Vision Statement */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-sage-light/30 to-gold-light/30 rounded-3xl p-12 mx-auto max-w-4xl">
            <blockquote className="text-2xl font-medium text-sage italic mb-6">
              "{t('mission.vision')}"
            </blockquote>
            <div className="text-gold font-semibold">— {t('mission.author')}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;