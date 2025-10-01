import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail, Globe, Clock, Users, MessageCircle } from 'lucide-react';
import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Format email body
    const emailBody = `Nom: ${formData.name}
Email: ${formData.email}
Téléphone: ${formData.phone || 'Non renseigné'}

Message:
${formData.message}`;
    
    // Create mailto URL
    const mailtoUrl = `mailto:ahloulbait1199tidjanya@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Open email client
    window.location.href = mailtoUrl;
    
    // Reset form
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
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
      title: 'Adresse',
      content: 'Abidjan, Côte d\'Ivoire',
      subtext: 'Grande Mosquée d\'Abobo'
    },
    {
      icon: Phone,
      title: 'Téléphone',
      content: '+225 05 05 28 78 94',
      subtext: 'Disponible 24h/7j'
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'ahloulbait1199tidjanya@gmail.com',
      subtext: 'Réponse sous 24h'
    },
    {
      icon: Globe,
      title: 'Site Web',
      content: 'www.ahloulbait1199-tidjanya.org',
      subtext: 'Ressources en ligne'
    }
  ];

  const callToActions = [
    {
      icon: Users,
      title: 'Rejoindre la communauté',
      description: 'Devenez membre de notre communauté spirituelle',
      action: 'Adhérer maintenant'
    },
    {
      icon: Clock,
      title: 'Horaires des prières',
      description: 'Consultez les horaires de nos activités quotidiennes',
      action: 'Voir les horaires'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-sage-light/10 to-gold-light/10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-sage mb-4">Contactez-nous</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-sage to-gold mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Nous sommes à votre écoute. N'hésitez pas à nous contacter pour toute question 
            ou pour rejoindre notre communauté.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-sage mb-6">Nos Coordonnées</h3>
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

            {/* Call to Actions */}
            <div className="space-y-4">
              {callToActions.map((cta, index) => (
                <Card key={cta.title} className="border-0 bg-gradient-to-r from-sage to-gold text-white hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <cta.icon className="w-8 h-8 text-white/90" />
                        <div>
                          <h4 className="font-bold mb-1">{cta.title}</h4>
                          <p className="text-sm opacity-90">{cta.description}</p>
                        </div>
                      </div>
                      <Button variant="secondary" size="sm" className="bg-white/20 text-white hover:bg-white/30 border-0">
                        {cta.action}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <Card className="border-0 bg-white/90 backdrop-blur-sm shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-sage mb-6">Nous rejoindre</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Remplissez ce formulaire et votre message s'ouvrira automatiquement dans votre client email.
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-sage mb-2 block">
                        Nom complet *
                      </label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Votre nom"
                        required
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
                        className="border-sage/20 focus:border-sage"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-sage mb-2 block">
                        Téléphone
                      </label>
                      <Input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+225 XX XX XX XX XX"
                        className="border-sage/20 focus:border-sage"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-sage mb-2 block">
                        Sujet *
                      </label>
                      <Input
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Objet de votre message"
                        required
                        className="border-sage/20 focus:border-sage"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-sage mb-2 block">
                      Message *
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Décrivez votre demande ou question..."
                      rows={5}
                      required
                      className="border-sage/20 focus:border-sage resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-sage to-gold text-white flex items-center gap-2"
                  >
                    <Mail className="w-5 h-5" />
                    Envoyer par Email
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