import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

// Knowledge Base pour AHLOUL BAIT
const knowledgeBase = {
  organization: {
    name: "AHLOUL BAIT",
    description: "Communauté spirituelle islamique de la voie Tidjaniya, à caractère social et apolitique",
    leader: "Cheikh Ahmad Tidjani Diabaté",
    founded: "2010",
    location: "Côte d'Ivoire",
    followers: "45 000 followers",
    status: "Enregistrée officiellement en Côte d'Ivoire depuis 2010"
  },
  mission: {
    slogan: "Unir les cœurs, élever les âmes, servir la communauté",
    objectives: [
      "Spiritualité et développement personnel",
      "Solidarité et entraide communautaire",
      "Promotion de la paix et de la tolérance",
      "Transmission des valeurs islamiques authentiques",
      "Éducation et formation des membres"
    ]
  },
  services: [
    {
      category: "Encadrement spirituel",
      activities: ["Prières collectives", "Enseignements religieux", "Méditation", "Guidance spirituelle"]
    },
    {
      category: "Actions sociales",
      activities: ["Aide aux familles démunies", "Soutien scolaire", "Assistance médicale", "Aide alimentaire"]
    },
    {
      category: "Éducation et formation",
      activities: ["Conférences islamiques", "Séminaires", "Cours d'arabe", "Formation des imams"]
    },
    {
      category: "Événements communautaires",
      activities: ["Célébrations religieuses", "Rencontres fraternelles", "Activités jeunesse", "Programmes culturels"]
    }
  ],
  contact: {
    address: "Abidjan, Côte d'Ivoire",
    phone: "+225 0505287894",
    email: "ahloulbait1199tidjanya@gmail.com",
    website: "www.ahloulbait1199-tidjanya.org"
  },
  faq: [
    {
      question: "Comment adhérer à AHLOUL BAIT ?",
      answer: "Pour adhérer, contactez-nous via nos coordonnées. L'adhésion est ouverte à tous ceux qui partagent nos valeurs de spiritualité, solidarité et paix."
    },
    {
      question: "AHLOUL BAIT est-elle une organisation politique ?",
      answer: "Non, AHLOUL BAIT est strictement apolitique. Nous nous concentrons uniquement sur la spiritualité, l'entraide sociale et l'éducation religieuse."
    },
    {
      question: "Quelles sont vos actions sociales concrètes ?",
      answer: "Nous menons des actions d'aide aux familles démunies, de soutien scolaire, d'assistance médicale et d'aide alimentaire pour les plus nécessiteux."
    },
    {
      question: "Comment puis-je contribuer à vos actions ?",
      answer: "Vous pouvez contribuer par des dons, du bénévolat, ou en participant à nos activités communautaires. Contactez-nous pour plus d'informations."
    }
  ]
};

const ChatRAG = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Assalamu alaikum ! Je suis l\'assistant virtuel d\'AHLOUL BAIT. Comment puis-je vous aider à mieux connaître notre organisation ?',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Fonction pour rechercher dans la knowledge base
  const searchKnowledgeBase = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    // Recherche par mots-clés
    if (lowerQuery.includes('mission') || lowerQuery.includes('objectif') || lowerQuery.includes('but')) {
      return `Notre mission est de "${knowledgeBase.mission.slogan}". Nos objectifs principaux sont :\n\n${knowledgeBase.mission.objectives.map(obj => `• ${obj}`).join('\n')}`;
    }
    
    if (lowerQuery.includes('service') || lowerQuery.includes('activité') || lowerQuery.includes('programme')) {
      let response = "Voici nos principaux services et activités :\n\n";
      knowledgeBase.services.forEach(service => {
        response += `**${service.category}** :\n${service.activities.map(act => `• ${act}`).join('\n')}\n\n`;
      });
      return response;
    }
    
    if (lowerQuery.includes('contact') || lowerQuery.includes('adresse') || lowerQuery.includes('téléphone') || lowerQuery.includes('email')) {
      return `Voici nos coordonnées :\n\n• **Adresse** : ${knowledgeBase.contact.address}\n• **Téléphone** : ${knowledgeBase.contact.phone}\n• **Email** : ${knowledgeBase.contact.email}\n• **Site web** : ${knowledgeBase.contact.website}`;
    }
    
    if (lowerQuery.includes('cheikh') || lowerQuery.includes('leader') || lowerQuery.includes('dirigeant')) {
      return `AHLOUL BAIT est guidée par ${knowledgeBase.organization.leader}. Notre organisation compte ${knowledgeBase.organization.followers} et a été officiellement enregistrée en Côte d'Ivoire depuis ${knowledgeBase.organization.founded}.`;
    }
    
    if (lowerQuery.includes('adhér') || lowerQuery.includes('rejoindre') || lowerQuery.includes('membre')) {
      const faqItem = knowledgeBase.faq.find(f => f.question.toLowerCase().includes('adhér'));
      return faqItem ? faqItem.answer : "Pour rejoindre AHLOUL BAIT, contactez-nous via nos coordonnées. L'adhésion est ouverte à tous ceux qui partagent nos valeurs.";
    }
    
    if (lowerQuery.includes('politique') || lowerQuery.includes('apolitique')) {
      const faqItem = knowledgeBase.faq.find(f => f.question.toLowerCase().includes('politique'));
      return faqItem ? faqItem.answer : "AHLOUL BAIT est strictement apolitique. Nous nous concentrons sur la spiritualité et l'entraide sociale.";
    }
    
    if (lowerQuery.includes('don') || lowerQuery.includes('contribu') || lowerQuery.includes('aide')) {
      const faqItem = knowledgeBase.faq.find(f => f.question.toLowerCase().includes('contribu'));
      return faqItem ? faqItem.answer : "Vous pouvez contribuer par des dons, du bénévolat, ou en participant à nos activités. Contactez-nous pour plus d'informations.";
    }
    
    if (lowerQuery.includes('tidjan') || lowerQuery.includes('voie') || lowerQuery.includes('spirituel')) {
      return `AHLOUL BAIT est une ${knowledgeBase.organization.description}. Nous suivons la voie spirituelle Tidjaniya sous la guidance de ${knowledgeBase.organization.leader}.`;
    }
    
    // Réponse par défaut si aucun mot-clé n'est trouvé
    return "Je ne trouve pas d'information spécifique sur ce sujet dans ma base de connaissances d'AHLOUL BAIT. Pouvez-vous reformuler votre question ou me demander des informations sur notre mission, nos services, nos contacts, ou comment nous rejoindre ?";
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simuler un délai de traitement
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: searchKnowledgeBase(inputValue),
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      {/* Chat Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-6 z-40 bg-emerald hover:bg-emerald-dark text-white shadow-floating hover:shadow-elegant transition-all duration-300 hover:scale-110 rounded-full w-14 h-14 p-0"
        size="lg"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-32 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] animate-scale-in">
          <Card className="border-emerald/20 shadow-elegant bg-white/95 backdrop-blur-md">
            <CardHeader className="bg-gradient-to-r from-emerald to-sage text-white p-4 rounded-t-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">Assistant AHLOUL BAIT</h3>
                    <p className="text-xs opacity-90">En ligne</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20 p-1 h-auto"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              {/* Messages */}
              <div className="h-80 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.isUser
                          ? 'bg-emerald text-white'
                          : 'bg-sage-light text-sage-dark'
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        {!message.isUser && (
                          <Bot className="w-4 h-4 mt-1 flex-shrink-0" />
                        )}
                        {message.isUser && (
                          <User className="w-4 h-4 mt-1 flex-shrink-0" />
                        )}
                        <div className="text-sm whitespace-pre-line">
                          {message.content}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-sage-light text-sage-dark rounded-lg p-3 max-w-[80%]">
                      <div className="flex items-center space-x-2">
                        <Bot className="w-4 h-4" />
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-sage rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-sage rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-sage rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-sage/10">
                <div className="flex space-x-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Posez votre question..."
                    className="border-sage/20 focus:border-emerald"
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isTyping}
                    className="bg-emerald hover:bg-emerald-dark text-white p-2"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default ChatRAG;