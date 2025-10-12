import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useFatwas } from '@/hooks/useFatwas';

const FatwasSection = () => {
  const { data: fatwas = [], isLoading: loading } = useFatwas();

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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {fatwas.map((fatwa, index) => (
        <Card
          key={fatwa.id}
          className="overflow-hidden hover:shadow-elegant transition-all duration-300 animate-fade-in"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <CardHeader>
            {fatwa.category && (
              <Badge variant="secondary" className="w-fit mb-2">
                {fatwa.category}
              </Badge>
            )}
            <CardTitle className="text-sage">Question</CardTitle>
            <CardDescription className="text-base">{fatwa.question}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {fatwa.questioner_name && (
              <div className="text-sm text-muted-foreground">
                <span className="font-medium">Posée par:</span> {fatwa.questioner_name}
              </div>
            )}
            {fatwa.scholar_name && (
              <div className="text-sm text-muted-foreground">
                <span className="font-medium">Répondu par:</span> {fatwa.scholar_name}
              </div>
            )}
            <div>
              <p className="text-sm font-medium mb-2">Réponse audio:</p>
              <audio
                controls
                controlsList="nodownload"
                className="w-full"
                src={fatwa.audio_url}
              >
                Votre navigateur ne supporte pas la lecture audio.
              </audio>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FatwasSection;
