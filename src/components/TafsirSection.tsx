import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';
import { useTafsir } from '@/hooks/useTafsir';

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
          <CardContent>
            {tafsir.content && (
              <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                {tafsir.content}
              </p>
            )}
            {tafsir.video_url && (
              <a
                href={tafsir.video_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-emerald hover:text-sage transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Voir la vidéo
              </a>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TafsirSection;
