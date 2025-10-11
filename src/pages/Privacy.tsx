import { Link } from 'react-router-dom';
import { Shield, Lock, Eye, Database, Cookie, UserCheck, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Privacy = () => {
  const sections = [
    {
      icon: Database,
      title: "Collecte des Données",
      content: "Nous collectons uniquement les informations nécessaires au bon fonctionnement de nos services : nom, email, et informations de participation aux événements. Ces données sont collectées avec votre consentement explicite."
    },
    {
      icon: Lock,
      title: "Sécurité des Données",
      content: "Vos données sont protégées par des mesures de sécurité avancées incluant le chiffrement, l'authentification sécurisée, et des politiques de contrôle d'accès strictes. Nous effectuons des audits de sécurité réguliers."
    },
    {
      icon: Eye,
      title: "Utilisation des Données",
      content: "Vos données sont utilisées exclusivement pour : gérer votre participation aux événements, vous envoyer des notifications importantes, améliorer nos services, et maintenir la sécurité de la plateforme. Nous ne vendons jamais vos données à des tiers."
    },
    {
      icon: Cookie,
      title: "Cookies et Cache",
      content: "Nous utilisons des cookies essentiels pour assurer le fonctionnement du site. Un nettoyage automatique du cache est effectué régulièrement pour optimiser les performances et protéger votre vie privée."
    },
    {
      icon: UserCheck,
      title: "Vos Droits",
      content: "Vous avez le droit d'accéder, de modifier, ou de supprimer vos données personnelles à tout moment. Vous pouvez également retirer votre consentement et demander l'exportation de vos données."
    },
    {
      icon: Shield,
      title: "Protection de la Vie Privée",
      content: "Nous respectons votre vie privée et nous engageons à ne jamais partager vos informations sans votre accord explicite, sauf obligation légale. Notre politique est conforme aux standards internationaux de protection des données."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-spiritual">
      {/* Header */}
      <div className="bg-sage text-white py-20">
        <div className="container mx-auto px-6">
          <Link 
            to="/" 
            className="inline-flex items-center text-sage-light hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à l'accueil
          </Link>
          
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
              Politique de Confidentialité
            </h1>
            <p className="text-lg text-sage-light">
              Votre confiance est notre priorité. Découvrez comment nous protégeons vos données personnelles.
            </p>
            <p className="text-sm text-sage-light mt-4">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto space-y-6">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <Card 
                key={index} 
                className="animate-fade-in hover:shadow-elegant transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-sage">
                    <div className="p-2 bg-sage/10 rounded-lg">
                      <Icon className="w-6 h-6 text-sage" />
                    </div>
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sage-dark leading-relaxed">
                    {section.content}
                  </p>
                </CardContent>
              </Card>
            );
          })}

          {/* Additional Information */}
          <Card className="bg-emerald/5 border-emerald/20">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold text-sage mb-4">Contact</h3>
              <p className="text-sage-dark mb-4">
                Pour toute question concernant cette politique de confidentialité ou pour exercer vos droits, 
                contactez-nous :
              </p>
              <div className="space-y-2 text-sage-dark">
                <p><strong>Email :</strong> ahloulbait1199tidjanya@gmail.com</p>
                <p><strong>Téléphone :</strong> +225 05 05 28 78 94</p>
                <p><strong>Adresse :</strong> Grande Mosquée d'Abobo, Abidjan, Côte d'Ivoire</p>
              </div>
            </CardContent>
          </Card>

          {/* Version Info */}
          <div className="text-center text-sm text-sage-dark/60 mt-8">
            <p>Version de la politique : 1.0</p>
            <p>Cette politique peut être mise à jour périodiquement. Les changements importants vous seront notifiés.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
