import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Heart } from 'lucide-react';

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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white/90'
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-sage to-gold rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-sage">AHLOUL BAIT</span>
              <span className="text-sm text-muted-foreground">Tidjaniya</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-sage hover:text-gold transition-colors duration-200 font-medium"
              >
                {item.name}
              </button>
            ))}
            <Button 
              variant="default"
              className="bg-sage hover:bg-sage-dark text-white"
              onClick={() => scrollToSection('#contact')}
            >
              Nous rejoindre
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-sage/10">
            <div className="flex flex-col space-y-4 pt-4">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="text-left text-sage hover:text-gold transition-colors duration-200 font-medium py-2"
                >
                  {item.name}
                </button>
              ))}
              <Button 
                variant="default"
                className="bg-sage hover:bg-sage-dark text-white w-full mt-4"
                onClick={() => scrollToSection('#contact')}
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