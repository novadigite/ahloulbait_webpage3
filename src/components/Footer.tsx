import { Heart, MapPin, Phone, Mail, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const quickLinks = [
    { name: t('nav.home'), href: '#accueil' },
    { name: t('nav.mission'), href: '#mission' },
    { name: t('nav.services'), href: '#services' },
    { name: t('nav.leadership'), href: '#leadership' },
    { name: t('nav.contact'), href: '#contact' },
    { name: t('nav.faq'), href: '#faq' }
  ];

  const services = [
    t('footer.servicesList.spiritual'),
    t('footer.servicesList.social'),
    t('footer.servicesList.education'),
    t('footer.servicesList.events')
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
              {t('footer.organization')}
            </p>

            <div className="text-sm text-sage-light">
              <p className="mb-2">
                <strong>Slogan :</strong><br />
                "{t('footer.slogan')}"
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-gold">{t('footer.quickLinks')}</h4>
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
            <h4 className="text-lg font-bold mb-6 text-gold">{t('footer.services')}</h4>
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
            <h4 className="text-lg font-bold mb-6 text-gold">{t('footer.contact')}</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gold mt-1 flex-shrink-0" />
                <div className="text-sm text-sage-light">
                  <p>{t('footer.location')}</p>
                  <p>{t('footer.mosque')}</p>
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
              © {new Date().getFullYear()} AHLOUL BAIT. {t('footer.rights')}
            </div>
            
            <div className="flex items-center flex-wrap justify-center gap-4 text-sm text-sage-light">
              <span>{t('footer.registered')}</span>
              <span>•</span>
              <span>{t('footer.followers')}</span>
              <span>•</span>
              <Link to="/privacy" className="hover:text-white transition-colors underline">
                {t('footer.privacy')}
              </Link>
            </div>
          </div>

          <div className="text-center mt-6 pt-6 border-t border-sage-light/10">
            <p className="text-sm text-sage-light italic">
              "{t('footer.guidedBy')}"
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;