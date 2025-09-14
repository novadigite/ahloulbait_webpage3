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
    officialName: "AHLOUL BAIT",
    nature: "Communauté Spirituelle Islamique de la voie Tidjaniya",
    character: "Social, apolitique",
    leader: "Cheikh Ahmad Tidjani Diabaté",
    slogan: "Unir les cœurs, élever les âmes, servir la communauté",
    location: "Abidjan, Côte d'Ivoire"
  },
  mission: {
    objectives: [
      "Promouvoir la spiritualité et la paix selon les enseignements de la voie Tidjaniya",
      "Offrir un encadrement spirituel et moral aux membres",
      "Renforcer la solidarité sociale par des actions concrètes en faveur des familles et des plus démunis",
      "Transmettre les valeurs islamiques de fraternité, d'éducation et de service à la communauté"
    ]
  },
  services: [
    {
      category: "Encadrement spirituel",
      activities: ["Prières collectives", "Enseignements religieux", "Retraites spirituelles"]
    },
    {
      category: "Actions sociales", 
      activities: ["Aides aux familles", "Soutien alimentaire", "Assistance médicale"]
    },
    {
      category: "Éducation & Formation",
      activities: ["Soutien scolaire", "Conférences", "Séminaires"]
    },
    {
      category: "Vie communautaire",
      activities: ["Célébrations religieuses", "Événements sociaux", "Activités de cohésion"]
    }
  ],
  leadership: {
    guide: "Cheikh Ahmad Tidjani Diabaté",
    team: "Hommes et femmes unis autour de la foi musulmane et des valeurs de solidarité",
    engagement: "Disponibilité, éthique et service à la communauté"
  },
  contact: {
    address: "Abidjan, Côte d'Ivoire",
    phone: "+225 0505287894",
    email: "ahloulbait1199tidjanya@gmail.com"
  }
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
      return `Notre mission est de "${knowledgeBase.organization.slogan}". Nos objectifs principaux sont :\n\n${knowledgeBase.mission.objectives.map(obj => `• ${obj}`).join('\n')}`;
    }
    
    if (lowerQuery.includes('service') || lowerQuery.includes('activité') || lowerQuery.includes('programme')) {
      let response = "Voici nos principaux services et activités :\n\n";
      knowledgeBase.services.forEach(service => {
        response += `**${service.category}** :\n${service.activities.map(act => `• ${act}`).join('\n')}\n\n`;
      });
      return response;
    }
    
    if (lowerQuery.includes('contact') || lowerQuery.includes('adresse') || lowerQuery.includes('téléphone') || lowerQuery.includes('email')) {
      return `Voici nos coordonnées :\n\n• **Adresse** : ${knowledgeBase.contact.address}\n• **Téléphone** : ${knowledgeBase.contact.phone}\n• **Email** : ${knowledgeBase.contact.email}`;
    }
    
    if (lowerQuery.includes('cheikh') || lowerQuery.includes('leader') || lowerQuery.includes('dirigeant') || lowerQuery.includes('guide')) {
      return `AHLOUL BAIT est guidée par ${knowledgeBase.organization.leader}. ${knowledgeBase.leadership.team}. Notre engagement : ${knowledgeBase.leadership.engagement}.`;
    }
    
    if (lowerQuery.includes('nature') || lowerQuery.includes('organisation') || lowerQuery.includes('communauté')) {
      return `${knowledgeBase.organization.name} est une ${knowledgeBase.organization.nature}. Notre caractère : ${knowledgeBase.organization.character}. Basée à ${knowledgeBase.organization.location}.`;
    }
    
    if (lowerQuery.includes('tidjan') || lowerQuery.includes('voie') || lowerQuery.includes('spirituel')) {
      return `AHLOUL BAIT suit la ${knowledgeBase.organization.nature} sous la guidance de ${knowledgeBase.organization.leader}. Notre devise : "${knowledgeBase.organization.slogan}".`;
    }
    
    if (lowerQuery.includes('politique') || lowerQuery.includes('apolitique')) {
      return `AHLOUL BAIT est strictement ${knowledgeBase.organization.character}. Nous nous concentrons uniquement sur la spiritualité, l'entraide sociale et l'éducation religieuse.`;
    }
    
    // Réponse par défaut si aucun mot-clé n'est trouvé
    return "Je suis désolé, je ne peux répondre qu'aux questions concernant AHLOUL BAIT. Merci de reformuler votre question ou me demander des informations sur notre mission, nos services, nos contacts, ou notre organisation.";
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
        className="fixed bottom-20 right-6 z-40 bg-emerald hover:bg-emerald-dark text-white shadow-floating hover:shadow-elegant transition-all duration-300 hover:scale-110 rounded-full px-4 py-2 h-auto flex items-center gap-2"
        size="lg"
      >
        💬 Poser une question
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