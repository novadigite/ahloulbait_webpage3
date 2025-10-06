import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import cheikhLogo from '@/assets/cheikh-photo.jpg';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Accueil', href: '#accueil' },
    { name: 'Mission', href: '#mission' },
    { name: 'Services', href: '#services' },
    { name: 'Leadership', href: '#leadership' },
    { name: 'Événements', href: '#evenements' },
    { name: 'Contact', href: '#contact' },
    { name: 'FAQ', href: '#faq' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-elegant border-b border-emerald/10' : 'bg-white/90 backdrop-blur-sm'
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3 group cursor-pointer hover:scale-105 transition-all duration-300">
            <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-emerald/20 group-hover:ring-gold/40 transition-all duration-300 shadow-soft">
              <img 
                src={cheikhLogo} 
                alt="AHLOUL BAIT Logo" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col group-hover:translate-x-1 transition-transform duration-300">
              <span className="text-xl font-playfair font-bold text-emerald">AHLOUL BAIT</span>
              <span className="text-sm text-muted-foreground font-inter">Tidjaniya</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-foreground hover:text-emerald transition-all duration-300 font-inter font-medium relative group"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald to-gold transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
            <Button 
              variant="default"
              className="bg-gradient-to-r from-emerald to-sage hover:from-emerald-dark hover:to-sage-dark text-white shadow-gold hover:shadow-elegant transition-all duration-300 hover:scale-105 font-inter"
              onClick={() => window.open('https://wa.me/2550757875302?text=Bonjour,%20je%20viens%20de%20votre%20site%20Internet.%20Je%20souhaite%20rejoindre%20la%20communauté%20AHLOUL%20BAIT%20Tidjaniya.', '_blank')}
            >
              Nous rejoindre
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden hover:bg-emerald/10 hover:scale-110 transition-all duration-300"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6 text-emerald" /> : <Menu className="w-6 h-6 text-emerald" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-emerald/10 animate-fade-in">
            <div className="flex flex-col space-y-4 pt-4">
              {navItems.map((item, index) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="text-left text-foreground hover:text-emerald transition-all duration-300 font-inter font-medium py-2 hover:translate-x-2 animate-slide-up"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  {item.name}
                </button>
              ))}
              <Button 
                variant="default"
                className="bg-gradient-to-r from-emerald to-sage hover:from-emerald-dark hover:to-sage-dark text-white w-full mt-4 hover:scale-105 transition-all duration-300 font-inter"
                onClick={() => window.open('https://wa.me/2550757875302?text=Bonjour,%20je%20viens%20de%20votre%20site%20Internet.%20Je%20souhaite%20rejoindre%20la%20communauté%20AHLOUL%20BAIT%20Tidjaniya.', '_blank')}
              >
                Nous rejoindre
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;