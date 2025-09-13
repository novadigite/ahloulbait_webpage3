import { Heart, MapPin, Phone, Mail, Globe } from 'lucide-react';

const Footer = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const quickLinks = [
    { name: 'Accueil', href: '#accueil' },
    { name: 'Mission', href: '#mission' },
    { name: 'Services', href: '#services' },
    { name: 'Leadership', href: '#leadership' },
    { name: 'Contact', href: '#contact' },
    { name: 'FAQ', href: '#faq' }
  ];

  const services = [
    'Encadrement Spirituel',
    'Actions Sociales',
    'Éducation & Formation',
    'Événements Communautaires'
  ];

  return (
    <footer className="bg-sage text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Organization Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-gold to-gold-dark rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">AHLOUL BAIT</h3>
                <p className="text-sage-light text-sm">Tidjaniya - Côte d'Ivoire</p>
              </div>
            </div>
            
            <p className="text-sage-light leading-relaxed mb-6">
              Organisation religieuse et sociale à caractère apolitique, 
              dédiée à la spiritualité, la solidarité et la paix communautaire.
            </p>

            <div className="text-sm text-sage-light">
              <p className="mb-2">
                <strong>Slogan :</strong><br />
                "Unir les cœurs, élever les âmes, servir la communauté"
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-gold">Liens Rapides</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-sage-light hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-gold">Nos Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service} className="text-sage-light text-sm">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-gold">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gold mt-1 flex-shrink-0" />
                <div className="text-sm text-sage-light">
                  <p>Abidjan, Côte d'Ivoire</p>
                  <p>Grande Mosquée d'Abobo</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gold flex-shrink-0" />
                <span className="text-sm text-sage-light">+225 05 05 28 78 94</span>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-gold mt-1 flex-shrink-0" />
                <span className="text-sm text-sage-light break-all">
                  ahloulbait1199tidjanya@gmail.com
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <Globe className="w-5 h-5 text-gold flex-shrink-0" />
                <span className="text-sm text-sage-light">
                  www.ahloulbait1199-tidjanya.org
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-sage-light/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-sage-light">
              © {new Date().getFullYear()} AHLOUL BAIT. Tous droits réservés.
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-sage-light">
              <span>Enregistrée officiellement depuis 2010</span>
              <span>•</span>
              <span>45 000+ followers</span>
            </div>
          </div>

          <div className="text-center mt-6 pt-6 border-t border-sage-light/10">
            <p className="text-sm text-sage-light italic">
              "Guidés par Cheikh Ahmad Tidjani Diabaté - Ambassadeur de la Paix"
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;