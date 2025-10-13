import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Award, Calendar, MapPin } from "lucide-react";
import cheikhPhoto from "@/assets/cheikh-photo.jpg";

const Leadership = () => {
  const achievements = [
    "Guide spirituel reconnu de la voie Tidjaniya",
    "Fondateur et Autorité Morale d'AHLOUL BAIT",
    "Imam de la Grande Mosquée d'Abobo",
    "Ambassadeur de la Paix communautaire",
  ];

  const qualities = [
    { icon: Users, title: "Leadership", description: "45 000 followers" },
    { icon: Award, title: "Reconnaissance", description: "Autorité spirituelle" },
    { icon: Calendar, title: "Expérience", description: "15+ années" },
    { icon: MapPin, title: "Présence", description: "Côte d'Ivoire" },
  ];

  return (
    <section id="leadership" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-sage mb-4">Notre Leadership</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-sage to-gold mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Une direction spirituelle éclairée et une équipe dévouée au service de la communauté
          </p>
        </div>

        {/* Main Leader Section */}
        <div className="max-w-6xl mx-auto mb-16">
          <Card className="overflow-hidden border-0 bg-gradient-to-br from-white to-sage-light/20 shadow-xl">
            <CardContent className="p-0">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Photo Section */}
                <div className="relative">
                  <div className="aspect-square lg:aspect-auto lg:h-full relative overflow-hidden">
                    <img src={cheikhPhoto} alt="Cheikh Ahmad Tidjani Diabaté" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-sage/20 to-transparent"></div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="mb-6">
                    <Badge className="bg-gold/10 text-gold border-gold/20 mb-4">Guide Spirituel</Badge>
                    <h3 className="text-3xl font-bold text-sage mb-2">Cheikh Ahmad Tidjani Diabaté</h3>
                    <p className="text-xl text-muted-foreground mb-4">Fondateur et Autorité Morale d'AHLOUL BAIT</p>
                  </div>

                  <div className="space-y-4 mb-8">
                    <p className="text-muted-foreground leading-relaxed">
                      Imam de la Grande Mosquée d'Abobo et guide spirituel respecté et ambassadeur de la paix en CI,
                      Cheikh Ahmad Tidjani Diabaté consacre sa vie à l'enseignement des valeurs islamiques authentiques
                      et au service de la communauté.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      Sous sa direction éclairée, AHLOUL BAIT est devenue une référence en matière de spiritualité, de
                      solidarité et de paix sociale en Côte d'Ivoire.
                    </p>
                  </div>

                  {/* Achievements */}
                  <div className="space-y-3">
                    {achievements.map((achievement, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-gradient-to-r from-sage to-gold rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-muted-foreground">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Qualities Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {qualities.map((quality, index) => (
            <Card
              key={quality.title}
              className="text-center border-0 bg-gradient-to-br from-white to-sage-light/10 hover:shadow-lg transition-all duration-300 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-sage to-gold rounded-xl flex items-center justify-center mx-auto mb-4">
                  <quality.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-sage mb-2">{quality.title}</h4>
                <p className="text-sm text-muted-foreground">{quality.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Team Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-sage-light/30 to-gold-light/30 rounded-3xl p-12 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-sage mb-6">Une Équipe Dévouée</h3>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Notre organisation s'appuie sur une équipe passionnée d'hommes et de femmes engagés, unis par les mêmes
              valeurs de spiritualité, de solidarité et de service. Ensemble, nous œuvrons quotidiennement pour le
              bien-être de notre communauté et la transmission des enseignements authentiques de l'Islam.
            </p>

            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-sage mb-1">25+</div>
                <div className="text-sm text-muted-foreground">Responsables communautaires</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-sage mb-1">100+</div>
                <div className="text-sm text-muted-foreground">Bénévoles actifs</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-sage mb-1">15+</div>
                <div className="text-sm text-muted-foreground">Années d'expérience</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Leadership;
