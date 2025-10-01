import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Image as ImageIcon, Video } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

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

  useEffect(() => {
    loadEvents();
  }, []);

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
    } catch (error) {
      console.error('Error loading events:', error);
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
            Événements
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez nos derniers événements et moments partagés
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => {
            const media = eventMedia[event.id] || [];
            const thumbnail = media[0];

            return (
              <Card
                key={event.id}
                className="overflow-hidden hover:shadow-elegant transition-shadow duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-0">
                  {thumbnail && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <div className="relative h-64 cursor-pointer group">
                          {thumbnail.media_type === 'video' ? (
                            <video
                              src={thumbnail.media_url}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <img
                              src={thumbnail.media_url}
                              alt={event.title}
                              className="w-full h-full object-cover"
                            />
                          )}
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            {thumbnail.media_type === 'video' ? (
                              <Video className="w-12 h-12 text-white" />
                            ) : (
                              <ImageIcon className="w-12 h-12 text-white" />
                            )}
                          </div>
                          {media.length > 1 && (
                            <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                              +{media.length - 1}
                            </div>
                          )}
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[80vh] overflow-y-auto">
                          {media.map((item) => (
                            <div key={item.id}>
                              {item.media_type === 'video' ? (
                                <video
                                  src={item.media_url}
                                  controls
                                  className="w-full rounded-lg"
                                />
                              ) : (
                                <img
                                  src={item.media_url}
                                  alt={event.title}
                                  className="w-full rounded-lg"
                                />
                              )}
                            </div>
                          ))}
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-sage mb-2">{event.title}</h3>
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {event.description}
                    </p>
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
      </div>
    </section>
  );
};

export default Events;
