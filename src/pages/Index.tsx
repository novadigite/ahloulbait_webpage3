import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Mission from '@/components/Mission';
import Services from '@/components/Services';
import Leadership from '@/components/Leadership';
import Contact from '@/components/Contact';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Mission />
      <Services />
      <Leadership />
      <Contact />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Index;
