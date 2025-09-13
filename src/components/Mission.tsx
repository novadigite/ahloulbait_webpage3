import { Card, CardContent } from '@/components/ui/card';
import { Heart, Users, BookOpen, Sparkles } from 'lucide-react';

const Mission = () => {
  const missions = [
    {
      icon: Heart,
      title: 'Spiritualité',
      description: 'Cultiver la foi et renforcer la connexion spirituelle à travers les enseignements de la voie Tidjaniya.',
      gradient: 'from-sage to-sage-dark'
    },
    {
      icon: Users,
      title: 'Solidarité',
      description: 'Favoriser l\'entraide communautaire et soutenir les familles dans le besoin avec compassion.',
      gradient: 'from-gold to-gold-dark'
    },
    {
      icon: BookOpen,
      title: 'Transmission',
      description: 'Transmettre les valeurs islamiques authentiques aux nouvelles générations avec sagesse.',
      gradient: 'from-sage-dark to-sage'
    },
    {
      icon: Sparkles,
      title: 'Paix',
      description: 'Promouvoir la paix sociale et l\'harmonie intercommunautaire dans notre société.',
      gradient: 'from-gold-dark to-gold'
    }
  ];

  return (
    <section id="mission" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold text-sage mb-4">Notre Mission</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-sage to-gold mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            AHLOUL BAIT s'engage à servir la communauté à travers quatre piliers fondamentaux 
            qui guident chacune de nos actions et initiatives.
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
              "Notre vision est de bâtir une communauté spirituelle forte, unie et solidaire, 
              où chaque membre peut grandir dans la foi tout en contribuant au bien-être collectif."
            </blockquote>
            <div className="text-gold font-semibold">— Cheikh Ahmad Tidjani Diabaté</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;