import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Image as ImageIcon, Video } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TafsirSection from './TafsirSection';
import SiraSection from './SiraSection';
import FatwasSection from './FatwasSection';

interface Event {
  id: string;
  title: string;
  description: string;
  event_date: string;
}

interface EventMedia {
  id: string;
  event_id: string;
  media_url: string;
  media_type: string;
}

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [eventMedia, setEventMedia] = useState<Record<string, EventMedia[]>>({});
  const [loading, setLoading] = useState(true);
  const [signedUrls, setSignedUrls] = useState<Record<string, string>>({});

  useEffect(() => {
    loadEvents();
  }, []);

  const getSignedUrl = async (url: string, mediaType: string): Promise<string> => {
    // Si l'URL commence par http, c'est déjà une URL complète
    if (url.startsWith('http')) {
      return url;
    }
    
    // Sinon, on génère une URL signée depuis Supabase Storage
    try {
      const bucket = mediaType === 'video' ? 'videos' : 'images';
      const { data, error } = await supabase.storage
        .from(bucket)
        .createSignedUrl(url, 3600); // URL valide pour 1 heure
      
      if (error) throw error;
      return data.signedUrl;
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Error generating signed URL:', error);
      }
      return url;
    }
  };

  const loadEvents = async () => {
    try {
      const { data: eventsData, error: eventsError } = await supabase
        .from('events')
        .select('*')
        .order('event_date', { ascending: false });

      if (eventsError) throw eventsError;

      setEvents(eventsData || []);

      // Load media for each event
      const { data: mediaData, error: mediaError } = await supabase
        .from('event_media')
        .select('*');

      if (mediaError) throw mediaError;

      // Group media by event_id
      const mediaByEvent: Record<string, EventMedia[]> = {};
      mediaData?.forEach((media) => {
        if (!mediaByEvent[media.event_id]) {
          mediaByEvent[media.event_id] = [];
        }
        mediaByEvent[media.event_id].push(media);
      });

      setEventMedia(mediaByEvent);
      
      // Générer les URLs signées pour tous les médias
      const urls: Record<string, string> = {};
      if (mediaData) {
        for (const media of mediaData) {
          urls[media.id] = await getSignedUrl(media.media_url, media.media_type);
        }
      }
      setSignedUrls(urls);
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Error loading events:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="evenements" className="py-20 bg-gradient-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-sage via-gold to-emerald bg-clip-text text-transparent">
              Événements
            </h2>
          </div>
          <div className="text-center text-muted-foreground">Chargement...</div>
        </div>
      </section>
    );
  }

  if (events.length === 0) {
    return (
      <section id="evenements" className="py-20 bg-gradient-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-sage via-gold to-emerald bg-clip-text text-transparent">
              Événements
            </h2>
          </div>
          <div className="text-center text-muted-foreground">
            Aucun événement pour le moment.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="evenements" className="py-20 bg-gradient-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-sage via-gold to-emerald bg-clip-text text-transparent">
            Événements & Enseignements
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez nos événements, tafsirs, sira et fatwas
          </p>
        </div>

        <Tabs defaultValue="events" className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 max-w-3xl mx-auto mb-8 sm:mb-12 gap-2 h-auto p-2 bg-white/80 backdrop-blur-sm shadow-soft rounded-xl animate-slide-up">
            <TabsTrigger value="events" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-sage data-[state=active]:to-emerald data-[state=active]:text-white transition-all duration-300 hover:scale-105 py-3">
              Événements
            </TabsTrigger>
            <TabsTrigger value="tafsir" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-sage data-[state=active]:to-emerald data-[state=active]:text-white transition-all duration-300 hover:scale-105 py-3">
              Tafsir
            </TabsTrigger>
            <TabsTrigger value="sira" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-sage data-[state=active]:to-emerald data-[state=active]:text-white transition-all duration-300 hover:scale-105 py-3">
              Sira
            </TabsTrigger>
            <TabsTrigger value="fatwas" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-sage data-[state=active]:to-emerald data-[state=active]:text-white transition-all duration-300 hover:scale-105 py-3">
              Fatwas
            </TabsTrigger>
          </TabsList>

          <TabsContent value="events">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event, index) => {
            const media = eventMedia[event.id] || [];
            const thumbnail = media[0];

            return (
              <Card
                key={event.id}
                className="overflow-hidden hover:shadow-elegant hover:-translate-y-2 transition-all duration-500 animate-fade-in group backdrop-blur-sm bg-white/95 border-2 border-transparent hover:border-emerald/30"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-0">
                  {thumbnail && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <div className="relative h-56 sm:h-64 md:h-72 cursor-pointer overflow-hidden bg-gradient-to-br from-sage/5 to-emerald/5">
                          {thumbnail.media_type === 'video' ? (
                            <video
                              src={signedUrls[thumbnail.id] || thumbnail.media_url}
                              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                              preload="metadata"
                            />
                          ) : (
                            <img
                              src={signedUrls[thumbnail.id] || thumbnail.media_url}
                              alt={event.title}
                              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                            />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                            {thumbnail.media_type === 'video' ? (
                              <Video className="w-16 h-16 text-white animate-pulse-slow" />
                            ) : (
                              <ImageIcon className="w-16 h-16 text-white animate-pulse-slow" />
                            )}
                          </div>
                          {media.length > 1 && (
                            <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                              +{media.length - 1}
                            </div>
                          )}
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[90vh]">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto">
                          {media.map((item) => (
                            <div key={item.id} className="flex items-center justify-center bg-black/5 rounded-lg p-2">
                              {item.media_type === 'video' ? (
                                <video
                                  src={signedUrls[item.id] || item.media_url}
                                  controls
                                  controlsList="nodownload"
                                  preload="metadata"
                                  className="w-full h-auto max-h-[70vh] rounded-lg"
                                >
                                  Votre navigateur ne supporte pas la lecture de vidéos.
                                </video>
                              ) : (
                                <img
                                  src={signedUrls[item.id] || item.media_url}
                                  alt={event.title}
                                  className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
                                />
                              )}
                            </div>
                          ))}
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                   <div className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-semibold text-sage mb-2 group-hover:text-emerald transition-colors duration-300">{event.title}</h3>
                    <Dialog>
                      <DialogTrigger asChild>
                        <p className="text-muted-foreground mb-4 line-clamp-3 cursor-pointer hover:text-foreground transition-colors">
                          {event.description}
                        </p>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <div className="space-y-4">
                          <h3 className="text-2xl font-semibold text-sage">{event.title}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            {new Date(event.event_date).toLocaleDateString('fr-FR', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </div>
                          <p className="text-muted-foreground whitespace-pre-wrap">
                            {event.description}
                          </p>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {new Date(event.event_date).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
              })}
            </div>
          </TabsContent>

          <TabsContent value="tafsir">
            <TafsirSection />
          </TabsContent>

          <TabsContent value="sira">
            <SiraSection />
          </TabsContent>

          <TabsContent value="fatwas">
            <FatwasSection />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Events;
