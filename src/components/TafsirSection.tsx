import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Video } from 'lucide-react';

interface Tafsir {
  id: string;
  title: string;
  description: string;
  surah_name: string;
  surah_number: number;
  content: string;
  video_url: string;
}

const TafsirSection = () => {
  const [tafsirs, setTafsirs] = useState<Tafsir[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTafsirs();
  }, []);

  const loadTafsirs = async () => {
    try {
      const { data, error } = await supabase
        .from('tafsir')
        .select('*')
        .order('surah_number', { ascending: true });

      if (error) throw error;
      setTafsirs(data || []);
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Error loading tafsir:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center text-muted-foreground py-8">Chargement...</div>;
  }

  if (tafsirs.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        Aucun tafsir disponible pour le moment.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {tafsirs.map((tafsir, index) => (
        <Card
          key={tafsir.id}
          className="overflow-hidden hover:shadow-elegant transition-shadow duration-300 animate-fade-in"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-sage to-emerald rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-medium text-gold">
                    Sourate {tafsir.surah_number}
                  </span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-sm text-muted-foreground">
                    {tafsir.surah_name}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-sage mb-2">{tafsir.title}</h3>
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {tafsir.description}
                </p>
                {tafsir.video_url && (
                  <a
                    href={tafsir.video_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-emerald hover:text-sage transition-colors"
                  >
                    <Video className="w-4 h-4" />
                    <span className="text-sm font-medium">Voir la vidéo</span>
                  </a>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TafsirSection;
