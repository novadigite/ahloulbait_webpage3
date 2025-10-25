import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const FAQ = () => {
  const { t } = useTranslation();
  
  const faqs = [
    {
      question: t('faq.questions.join.q'),
      answer: t('faq.questions.join.a')
    },
    {
      question: t('faq.questions.activities.q'),
      answer: t('faq.questions.activities.a')
    },
    {
      question: t('faq.questions.donations.q'),
      answer: t('faq.questions.donations.a')
    },
    {
      question: t('faq.questions.prayers.q'),
      answer: t('faq.questions.prayers.a')
    },
    {
      question: t('faq.questions.tidjaniya.q'),
      answer: t('faq.questions.tidjaniya.a')
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
        <header className="text-center mb-16">
          <h2 className="text-4xl font-bold text-sage mb-4">{t('faq.title')}</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-sage to-gold mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t('faq.subtitle')}
          </p>
        </header>

        <article className="max-w-4xl mx-auto">
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
                  <h3 className="text-2xl font-bold">{t('faq.subtitle')}</h3>
                </div>
                <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
                  {t('contact.subtitle')}
                </p>
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white text-sage hover:bg-white/90"
                  onClick={() => scrollToSection('#contact')}
                >
                  {t('nav.contact')}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </article>
      </div>
    </section>
  );
};

export default FAQ;