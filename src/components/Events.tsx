import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Image as ImageIcon, Video } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import TafsirSection from './TafsirSection';
import SiraSection from './SiraSection';
import FatwasSection from './FatwasSection';
import { useEvents } from '@/hooks/useEvents';
import { useTranslation } from 'react-i18next';

interface EventMedia {
  id: string;
  event_id: string;
  media_url: string;
  media_type: string;
}

const Events = () => {
  const { t } = useTranslation();
  const { data: events = [], isLoading: loading } = useEvents();
  const [eventMedia, setEventMedia] = useState<Record<string, EventMedia[]>>({});

  useEffect(() => {
    if (events.length > 0) {
      loadEventMedia();
    }
  }, [events]);

  const getPublicUrl = (url: string): string => {
    // If it's already a full URL (YouTube, external), return as is
    if (url.startsWith('http')) {
      return url;
    }
    
    // Build public URL for event-media bucket
    const { data } = supabase.storage
      .from('event-media')
      .getPublicUrl(url);
    
    return data.publicUrl;
  };

  const getYoutubeEmbedUrl = (url: string): string | null => {
    // Check if it's a YouTube URL and convert to embed format
    const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(youtubeRegex);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
    return null;
  };

  const isYoutubeUrl = (url: string): boolean => {
    return url.includes('youtube.com') || url.includes('youtu.be');
  };

  const loadEventMedia = async () => {
    try {
      const { data: mediaData, error: mediaError } = await supabase
        .from('event_media')
        .select('*')
        .in('event_id', events.map(e => e.id));

      if (mediaError) throw mediaError;

      const mediaByEvent: { [key: string]: EventMedia[] } = {};
      mediaData?.forEach((media) => {
        if (!mediaByEvent[media.event_id]) {
          mediaByEvent[media.event_id] = [];
        }
        mediaByEvent[media.event_id].push(media);
      });

      setEventMedia(mediaByEvent);
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Error loading event media:', error);
      }
    }
  };

  if (loading) {
    return (
      <section id="evenements" className="py-20 bg-gradient-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-sage via-gold to-emerald bg-clip-text text-transparent">
              {t('events.title')}
            </h2>
          </div>
          <div className="text-center text-muted-foreground">{t('events.loading')}</div>
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
              {t('events.title')}
            </h2>
          </div>
          <div className="text-center text-muted-foreground">
            {t('events.noEvents')}
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
            {t('events.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('events.subtitle')}
          </p>
        </div>

        <Tabs defaultValue="events" className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 max-w-3xl mx-auto mb-8 sm:mb-12 gap-2 h-auto p-2 bg-white/80 backdrop-blur-sm shadow-soft rounded-xl animate-slide-up">
            <TabsTrigger value="events" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-sage data-[state=active]:to-emerald data-[state=active]:text-white transition-all duration-300 hover:scale-105 py-3">
              {t('events.tabs.events')}
            </TabsTrigger>
            <TabsTrigger value="tafsir" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-sage data-[state=active]:to-emerald data-[state=active]:text-white transition-all duration-300 hover:scale-105 py-3">
              {t('events.tabs.tafsir')}
            </TabsTrigger>
            <TabsTrigger value="sira" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-sage data-[state=active]:to-emerald data-[state=active]:text-white transition-all duration-300 hover:scale-105 py-3">
              {t('events.tabs.sira')}
            </TabsTrigger>
            <TabsTrigger value="fatwas" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-sage data-[state=active]:to-emerald data-[state=active]:text-white transition-all duration-300 hover:scale-105 py-3">
              {t('events.tabs.fatwas')}
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
                            isYoutubeUrl(thumbnail.media_url) ? (
                              <div className="w-full h-full relative">
                                <img 
                                  src={`https://img.youtube.com/vi/${thumbnail.media_url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1]}/maxresdefault.jpg`}
                                  alt={event.title}
                                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                                  onError={(e) => {
                                    e.currentTarget.src = `https://img.youtube.com/vi/${thumbnail.media_url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1]}/hqdefault.jpg`;
                                  }}
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                                    <Video className="w-8 h-8 text-white ml-1" />
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <video
                                src={getPublicUrl(thumbnail.media_url)}
                                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                                preload="metadata"
                              />
                            )
                          ) : (
                            <img
                              src={getPublicUrl(thumbnail.media_url)}
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
                      <DialogContent className="max-w-7xl w-[95vw] max-h-[90vh] p-4 sm:p-6">
                        <Carousel className="w-full">
                          <CarouselContent>
                            {media.map((item) => (
                              <CarouselItem key={item.id}>
                                <div className="relative w-full bg-black/5 rounded-lg overflow-hidden flex items-center justify-center min-h-[60vh]">
                                  {item.media_type === 'video' ? (
                                    isYoutubeUrl(item.media_url) ? (
                                      <iframe
                                        src={getYoutubeEmbedUrl(item.media_url) || item.media_url}
                                        className="w-full aspect-video rounded-lg"
                                        style={{ minHeight: '60vh' }}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                      />
                                    ) : (
                                      <video
                                        src={getPublicUrl(item.media_url)}
                                        controls
                                        controlsList="nodownload"
                                        preload="metadata"
                                        className="w-full h-auto max-h-[75vh] rounded-lg"
                                      >
                                        Votre navigateur ne supporte pas la lecture de vidéos.
                                      </video>
                                    )
                                  ) : (
                                    <img
                                      src={getPublicUrl(item.media_url)}
                                      alt={event.title}
                                      className="w-full h-auto max-h-[75vh] object-contain rounded-lg"
                                    />
                                  )}
                                </div>
                              </CarouselItem>
                            ))}
                          </CarouselContent>
                          <CarouselPrevious className="left-2 sm:left-4" />
                          <CarouselNext className="right-2 sm:right-4" />
                        </Carousel>
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
