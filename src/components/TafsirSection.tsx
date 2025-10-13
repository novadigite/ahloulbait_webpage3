import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, Youtube } from 'lucide-react';
import { useTafsir } from '@/hooks/useTafsir';
import { Button } from '@/components/ui/button';

const TafsirSection = () => {
  const { data: tafsirs = [], isLoading: loading } = useTafsir();

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
    <div className="space-y-8">
      <div className="flex justify-center">
        <Button
          variant="outline"
          size="lg"
          className="gap-2"
          onClick={() => window.open('https://www.youtube.com/@cheikhahmadtidjanydiabatea219/', '_blank')}
        >
          <Youtube className="w-5 h-5" />
          Voir plus sur notre chaîne YouTube
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tafsirs.map((tafsir, index) => (
          <Card
            key={tafsir.id}
            className="overflow-hidden hover:shadow-elegant transition-all duration-300 animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-emerald">
                  Sourate {tafsir.surah_number}: {tafsir.surah_name}
                </span>
              </div>
              <CardTitle className="text-sage">{tafsir.title}</CardTitle>
              <CardDescription>{tafsir.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {tafsir.content && (
                <p className="text-muted-foreground text-sm line-clamp-3">
                  {tafsir.content}
                </p>
              )}
              {tafsir.video_url && (
                <div className="aspect-video w-full rounded-lg overflow-hidden">
                  <video
                    controls
                    className="w-full h-full object-cover"
                    src={tafsir.video_url}
                  >
                    Votre navigateur ne supporte pas la lecture de vidéos.
                  </video>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TafsirSection;
