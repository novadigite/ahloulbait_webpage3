import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, ArrowRight } from 'lucide-react';

const FAQ = () => {
  const faqs = [
    {
      question: 'Comment puis-je rejoindre AHLOUL BAIT ?',
      answer: 'Pour rejoindre notre communauté, vous pouvez vous présenter à la Grande Mosquée d\'Abobo ou nous contacter par téléphone au +225 05 05 28 78 94. Nous organisons également des sessions d\'accueil pour nouveaux membres chaque vendredi après la prière. L\'adhésion est ouverte à tous ceux qui partagent nos valeurs de spiritualité, de solidarité et de paix.'
    },
    {
      question: 'AHLOUL BAIT est-elle une organisation politique ?',
      answer: 'Non, AHLOUL BAIT est strictement apolitique. Notre mission se concentre exclusivement sur la spiritualité, l\'éducation religieuse, l\'entraide sociale et la promotion de la paix. Nous ne prenons aucune position politique et encourageons nos membres à maintenir cette neutralité dans le cadre de nos activités communautaires.'
    },
    {
      question: 'Quelles sont vos principales activités sociales ?',
      answer: 'Nos actions sociales incluent l\'aide alimentaire aux familles démunies, le soutien scolaire pour les enfants, l\'assistance médicale d\'urgence, les programmes d\'alphabétisation pour adultes, et l\'octroi de bourses d\'études. Nous organisons aussi des formations professionnelles et des activités génératrices de revenus pour autonomiser notre communauté.'
    },
    {
      question: 'Comment puis-je contribuer ou faire un don ?',
      answer: 'Vous pouvez contribuer de plusieurs façons : dons financiers, bénévolat pour nos activités, parrainage d\'enfants pour leur scolarité, ou participation à nos événements caritatifs. Contactez-nous pour connaître les modalités de contribution. Toutes les contributions sont utilisées de manière transparente pour nos actions sociales et spirituelles.'
    },
    {
      question: 'Proposez-vous des formations religieuses ?',
      answer: 'Oui, nous dispensons des cours de Coran, d\'arabe, d\'études islamiques et des sessions d\'enseignement sur la voie Tidjaniya. Ces formations sont ouvertes à tous les âges et tous les niveaux. Nous organisons également des conférences, des séminaires et des cercles de discussion sur divers sujets religieux et spirituels.'
    },
    {
      question: 'Où se déroulent vos activités principales ?',
      answer: 'Nos activités principales ont lieu à la Grande Mosquée d\'Abobo à Abidjan, mais nous intervenons également dans d\'autres quartiers selon les besoins. Nous disposons de plusieurs centres d\'activités et collaborons avec d\'autres mosquées et organisations communautaires pour étendre notre impact social et spirituel.'
    }
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-sage mb-4">Questions Fréquentes</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-sage to-gold mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Retrouvez les réponses aux questions les plus courantes concernant 
            notre organisation, nos activités et notre mission.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="border-0 bg-gradient-to-br from-white to-sage-light/10 shadow-lg">
            <CardContent className="p-8">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    className="border border-sage/10 rounded-lg px-6 bg-white/50"
                  >
                    <AccordionTrigger className="text-left hover:no-underline py-6">
                      <span className="text-sage font-semibold pr-4">
                        {faq.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* Contact CTA */}
          <div className="mt-12 text-center">
            <Card className="border-0 bg-gradient-to-r from-sage to-gold text-white">
              <CardContent className="p-8">
                <div className="flex items-center justify-center mb-4">
                  <MessageCircle className="w-8 h-8 mr-3" />
                  <h3 className="text-2xl font-bold">Une autre question ?</h3>
                </div>
                <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
                  Notre équipe est à votre disposition pour répondre à toutes vos questions 
                  et vous accompagner dans votre démarche spirituelle.
                </p>
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white text-sage hover:bg-white/90"
                  onClick={() => scrollToSection('#contact')}
                >
                  Nous contacter
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;