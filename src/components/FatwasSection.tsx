import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { MessageSquare, Volume2, User } from 'lucide-react';

interface Fatwa {
  id: string;
  question: string;
  questioner_name: string;
  audio_url: string;
  scholar_name: string;
  category: string;
}

const FatwasSection = () => {
  const [fatwas, setFatwas] = useState<Fatwa[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFatwas();
  }, []);

  const loadFatwas = async () => {
    try {
      const { data, error } = await supabase
        .from('fatwas')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFatwas(data || []);
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Error loading fatwas:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center text-muted-foreground py-8">Chargement...</div>;
  }

  if (fatwas.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        Aucune fatwa disponible pour le moment.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {fatwas.map((fatwa, index) => (
        <Card
          key={fatwa.id}
          className="overflow-hidden hover:shadow-elegant transition-shadow duration-300 animate-fade-in"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-gold to-amber-600 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  {fatwa.category && (
                    <span className="inline-block px-3 py-1 bg-sage/10 text-sage text-xs font-medium rounded-full mb-2">
                      {fatwa.category}
                    </span>
                  )}
                  <h3 className="text-xl font-semibold text-sage mb-2">Question</h3>
                  <p className="text-foreground mb-4">{fatwa.question}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    {fatwa.questioner_name && (
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{fatwa.questioner_name}</span>
                      </div>
                    )}
                    {fatwa.scholar_name && (
                      <div className="flex items-center gap-2">
                        <span>•</span>
                        <span className="text-emerald font-medium">
                          Réponse par {fatwa.scholar_name}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="bg-gradient-card rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Volume2 className="w-5 h-5 text-emerald" />
                      <span className="text-sm font-medium text-sage">
                        Écouter la réponse
                      </span>
                    </div>
                    <audio
                      controls
                      className="w-full"
                      src={fatwa.audio_url}
                    >
                      Votre navigateur ne supporte pas l'élément audio.
                    </audio>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FatwasSection;
