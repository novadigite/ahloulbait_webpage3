import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}


const ChatRAG = () => {
  const { toast } = useToast();
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

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsTyping(true);

    try {
      // Préparer l'historique de conversation pour l'IA
      const conversationHistory = messages.map(msg => ({
        role: msg.isUser ? 'user' : 'assistant',
        content: msg.content
      }));

      // Ajouter le nouveau message utilisateur
      conversationHistory.push({
        role: 'user',
        content: currentInput
      });

      const { data, error } = await supabase.functions.invoke('ahloul-bait-chat', {
        body: { messages: conversationHistory }
      });

      if (error) throw error;

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: data.reply || 'Désolé, je n\'ai pas pu générer une réponse. Veuillez réessayer.',
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Désolé, une erreur est survenue. Veuillez réessayer dans quelques instants.',
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
      
      toast({
        title: "Erreur",
        description: "Impossible d'obtenir une réponse. Veuillez réessayer.",
        variant: "destructive"
      });
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-4 md:right-6 z-40 bg-emerald hover:bg-emerald-dark text-white shadow-floating hover:shadow-elegant transition-all duration-300 hover:scale-110 rounded-full px-3 md:px-4 py-2 h-auto flex items-center gap-2 text-sm md:text-base animate-fade-in"
        size="lg"
      >
        <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
        <span>Poser une question</span>
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed inset-x-4 bottom-4 md:inset-x-auto md:bottom-32 md:right-6 z-50 md:w-96 animate-scale-in">
          <Card className="border-emerald/20 shadow-elegant bg-background backdrop-blur-md h-[calc(100vh-6rem)] md:h-auto">
            <CardHeader className="bg-gradient-to-r from-emerald to-sage text-white p-3 md:p-4 rounded-t-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 md:space-x-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
                    <Bot className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm md:text-base">Assistant AHLOUL BAIT</h3>
                    <p className="text-xs opacity-90">En ligne</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20 p-1 h-auto transition-all hover:scale-110"
                >
                  <X className="w-4 h-4 md:w-5 md:h-5" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="p-0 flex flex-col h-[calc(100%-5rem)] md:h-auto">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4 md:h-80 scroll-smooth">
                {messages.map((message, index) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div
                      className={`max-w-[85%] md:max-w-[80%] rounded-lg p-3 transition-all hover:shadow-md ${
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
                        <div className="text-sm whitespace-pre-line break-words">
                          {message.content}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start animate-fade-in">
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
              <div className="p-3 md:p-4 border-t border-sage/10 bg-background">
                <div className="flex space-x-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Posez votre question..."
                    className="border-sage/20 focus:border-emerald transition-all text-sm md:text-base"
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isTyping}
                    className="bg-emerald hover:bg-emerald-dark text-white p-2 transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
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