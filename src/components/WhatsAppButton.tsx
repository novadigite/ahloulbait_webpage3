import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const WhatsAppButton = () => {
  const whatsappUrl = 'https://wa.me/2250584492859?text=Bonjour,%20je%20viens%20de%20votre%20site%20Internet.%20Je%20suis%20intéressé%20par%20[service].%20Pouvez-vous%20me%20donner%20plus%20d\'informations%20?';

  const handleWhatsAppClick = () => {
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-40 bg-[#25D366] hover:bg-[#128C7E] text-white shadow-floating hover:shadow-elegant transition-all duration-300 hover:scale-110 rounded-full w-14 h-14 p-0 group"
      size="lg"
      title="Contactez-nous sur WhatsApp"
    >
      <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
    </Button>
  );
};

export default WhatsAppButton;