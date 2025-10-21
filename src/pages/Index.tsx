import { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Mission from '@/components/Mission';
import Services from '@/components/Services';
import Leadership from '@/components/Leadership';
import Events from '@/components/Events';
import Contact from '@/components/Contact';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const Index = () => {
  const [scrollY, setScrollY] = useState(0);
  const missionAnimation = useScrollAnimation({ threshold: 0.2 });
  const servicesAnimation = useScrollAnimation({ threshold: 0.2 });
  const leadershipAnimation = useScrollAnimation({ threshold: 0.2 });
  const eventsAnimation = useScrollAnimation({ threshold: 0.2 });
  const contactAnimation = useScrollAnimation({ threshold: 0.2 });
  const faqAnimation = useScrollAnimation({ threshold: 0.2 });

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen overflow-hidden">
      <Navigation />
      <Hero />
      
      <div 
        ref={missionAnimation.ref}
        className={`scroll-reveal scroll-reveal-up ${missionAnimation.isVisible ? 'is-visible' : ''}`}
        style={{ transitionDelay: '100ms' }}
      >
        <Mission />
      </div>

      <div 
        ref={servicesAnimation.ref}
        className={`scroll-reveal scroll-reveal-scale ${servicesAnimation.isVisible ? 'is-visible' : ''}`}
        style={{ transitionDelay: '150ms' }}
      >
        <Services />
      </div>

      <div 
        ref={leadershipAnimation.ref}
        className={`scroll-reveal scroll-reveal-left ${leadershipAnimation.isVisible ? 'is-visible' : ''}`}
        style={{ transitionDelay: '200ms' }}
      >
        <Leadership />
      </div>

      <div 
        ref={eventsAnimation.ref}
        className={`scroll-reveal scroll-reveal-right ${eventsAnimation.isVisible ? 'is-visible' : ''}`}
        style={{ transitionDelay: '250ms' }}
      >
        <Events />
      </div>

      <div 
        ref={contactAnimation.ref}
        className={`scroll-reveal scroll-reveal-up ${contactAnimation.isVisible ? 'is-visible' : ''}`}
        style={{ transitionDelay: '300ms' }}
      >
        <Contact />
      </div>

      <div 
        ref={faqAnimation.ref}
        className={`scroll-reveal scroll-reveal-scale ${faqAnimation.isVisible ? 'is-visible' : ''}`}
        style={{ transitionDelay: '350ms' }}
      >
        <FAQ />
      </div>

      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default Index;
