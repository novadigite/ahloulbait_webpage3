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

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Mission />
      <Services />
      <Leadership />
      <Events />
      <Contact />
      <FAQ />
      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default Index;
