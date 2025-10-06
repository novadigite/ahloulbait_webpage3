import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Play, Clock } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

interface Sira {
  id: string;
  title: string;
  description: string;
  video_url: string;
  thumbnail_url: string;
  duration: string;
}

const SiraSection = () => {
  const [siras, setSiras] = useState<Sira[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSiras();
  }, []);

  const loadSiras = async () => {
    try {
      const { data, error } = await supabase
        .from('sira')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSiras(data || []);
    } catch (error) {
      console.error('Error loading sira:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center text-muted-foreground py-8">Chargement...</div>;
  }

  if (siras.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        Aucune vidéo de Sira disponible pour le moment.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {siras.map((sira, index) => (
        <Dialog key={sira.id}>
          <DialogTrigger asChild>
            <Card
              className="overflow-hidden hover:shadow-elegant transition-all duration-300 cursor-pointer group animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-0">
                <div className="relative h-48">
                  {sira.thumbnail_url ? (
                    <img
                      src={sira.thumbnail_url}
                      alt={sira.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-sage to-emerald flex items-center justify-center">
                      <Play className="w-16 h-16 text-white opacity-50" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Play className="w-16 h-16 text-white" />
                  </div>
                  {sira.duration && (
                    <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {sira.duration}
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-sage mb-2 line-clamp-1">
                    {sira.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-2">
                    {sira.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-sage">{sira.title}</h2>
              <div className="aspect-video">
                <video
                  src={sira.video_url}
                  controls
                  className="w-full h-full rounded-lg"
                />
              </div>
              <p className="text-muted-foreground">{sira.description}</p>
            </div>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
};

export default SiraSection;
