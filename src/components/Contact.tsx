import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail, Globe, Clock, Users, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import PrayerTimes from './PrayerTimes';
import { useToast } from '@/hooks/use-toast';
import { contactSchema } from '@/lib/validation';
import { useTranslation } from 'react-i18next';
import { checkRateLimit } from '@/lib/rateLimit';

const Contact = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  // IMPORTANT: Remplacez 'YOUR_FORM_ID' par votre ID Formspree
  // Créez un compte gratuit sur https://formspree.io et obtenez votre endpoint
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    setIsSubmitting(true);
    
    try {
      // Validation simple
      if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
        toast({
          title: "Erreur",
          description: "Veuillez remplir tous les champs requis.",
          variant: "destructive",
        });
        return;
      }

      // Envoi à Formspree
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Message envoyé !",
          description: "Nous avons bien reçu votre message et vous répondrons dans les plus brefs délais.",
        });
        
        // Reset form
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Erreur lors de l\'envoi');
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi du message. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: t('contact.info.address').split(',')[0],
      content: t('contact.info.address'),
      subtext: 'Grande Mosquée d\'Abobo'
    },
    {
      icon: Phone,
      title: t('contact.form.phone'),
      content: t('contact.info.phone'),
      subtext: t('contact.info.hours')
    },
    {
      icon: Mail,
      title: t('contact.form.email'),
      content: t('contact.info.email'),
      subtext: t('contact.info.saturday')
    },
    {
      icon: Globe,
      title: 'Site Web',
      content: 'www.ahloulbait1199-tidjanya.org',
      subtext: 'Ressources en ligne'
    }
  ];

  const handleWhatsAppJoin = () => {
    window.open(`https://wa.me/2550757875302?text=${encodeURIComponent(t('whatsapp.message'))}`, '_blank');
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-sage-light/10 to-gold-light/10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-sage mb-4">{t('contact.title')}</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-sage to-gold mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-sage mb-6">{t('contact.title')}</h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <Card key={info.title} className="border-0 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-sage to-gold rounded-xl flex items-center justify-center flex-shrink-0">
                          <info.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sage mb-1">{info.title}</h4>
                          <p className="text-muted-foreground font-medium">{info.content}</p>
                          <p className="text-sm text-muted-foreground">{info.subtext}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Call to Action - Rejoindre */}
            <Card 
              className="border-0 bg-gradient-to-r from-emerald to-sage text-white hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105"
              onClick={handleWhatsAppJoin}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <MessageCircle className="w-8 h-8 text-white/90" />
                    <div>
                      <h4 className="font-bold mb-1">{t('nav.joinUs')}</h4>
                      <p className="text-sm opacity-90">{t('whatsapp.message')}</p>
                    </div>
                  </div>
                  <Button variant="secondary" size="sm" className="bg-white/20 text-white hover:bg-white/30 border-0">
                    {t('nav.joinUs')}
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Prayer Times */}
            <PrayerTimes />
          </div>

          {/* Contact Form */}
          <div>
            <Card className="border-0 bg-white/90 backdrop-blur-sm shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-sage mb-6">{t('nav.joinUs')}</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  {t('contact.subtitle')}
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="text-sm font-medium text-sage mb-2 block">
                      Nom *
                    </label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Votre nom complet"
                      required
                      maxLength={100}
                      className="border-sage/20 focus:border-sage"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-sage mb-2 block">
                      Email *
                    </label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="votre@email.com"
                      required
                      maxLength={255}
                      className="border-sage/20 focus:border-sage"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-sage mb-2 block">
                      Message *
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Votre message..."
                      rows={6}
                      required
                      minLength={10}
                      maxLength={2000}
                      className="border-sage/20 focus:border-sage resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-sage to-gold text-white flex items-center gap-2 hover:opacity-90 transition-opacity"
                  >
                    <Mail className="w-5 h-5" />
                    {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;