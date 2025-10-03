import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { LogOut, Plus, Trash2, Calendar, Upload } from 'lucide-react';
import { Session } from '@supabase/supabase-js';

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

const Admin = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<Event[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check auth and admin status
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (!session) {
        navigate('/auth');
        return;
      }
      checkAdminStatus(session.user.id);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) {
        navigate('/auth');
      } else {
        checkAdminStatus(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const checkAdminStatus = async (userId: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/auth');
        return;
      }

      const { data, error } = await supabase.functions.invoke('check-admin', {
        headers: {
          Authorization: `Bearer ${session.access_token}`
        }
      });

      if (error) throw error;

      if (data?.isAdmin === true) {
        setIsAdmin(true);
        loadEvents();
      } else {
        toast({
          title: "Accès refusé",
          description: "Vous n'avez pas les droits administrateur.",
          variant: "destructive",
        });
        navigate('/');
      }
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const loadEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('event_date', { ascending: false });

      if (error) throw error;
      setEvents(data || []);
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les événements.",
        variant: "destructive",
      });
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) return;

    // Validate input lengths
    if (title.length === 0 || title.length > 200) {
      toast({
        title: "Erreur de validation",
        description: "Le titre doit contenir entre 1 et 200 caractères.",
        variant: "destructive",
      });
      return;
    }

    if (description && description.length > 5000) {
      toast({
        title: "Erreur de validation",
        description: "La description ne peut pas dépasser 5000 caractères.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);

    try {
      // Create event
      const { data: eventData, error: eventError } = await supabase
        .from('events')
        .insert({
          title,
          description,
          event_date: eventDate,
          created_by: session.user.id,
        })
        .select()
        .single();

      if (eventError) throw eventError;

      // Upload media files
      if (selectedFiles && selectedFiles.length > 0) {
        for (let i = 0; i < selectedFiles.length; i++) {
          const file = selectedFiles[i];
          const fileExt = file.name.split('.').pop();
          const fileName = `${eventData.id}/${Date.now()}-${i}.${fileExt}`;
          const mediaType = file.type.startsWith('video/') ? 'video' : 'image';

          // Upload to storage
          const { error: uploadError } = await supabase.storage
            .from('event-media')
            .upload(fileName, file);

          if (uploadError) throw uploadError;

          // Get public URL
          const { data: { publicUrl } } = supabase.storage
            .from('event-media')
            .getPublicUrl(fileName);

          // Save media reference
          const { error: mediaError } = await supabase
            .from('event_media')
            .insert({
              event_id: eventData.id,
              media_url: publicUrl,
              media_type: mediaType,
            });

          if (mediaError) throw mediaError;
        }
      }

      toast({
        title: "Événement créé",
        description: "L'événement a été publié avec succès.",
      });

      // Reset form
      setTitle('');
      setDescription('');
      setEventDate('');
      setSelectedFiles(null);
      loadEvents();
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (eventId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) return;

    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', eventId);

      if (error) throw error;

      toast({
        title: "Événement supprimé",
        description: "L'événement a été supprimé avec succès.",
      });

      loadEvents();
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Chargement...</p>
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-gradient-spiritual p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-sage">Administration des événements</h1>
          <Button onClick={handleSignOut} variant="outline">
            <LogOut className="w-4 h-4 mr-2" />
            Déconnexion
          </Button>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Créer un nouvel événement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-2">
                  Titre
                </label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  maxLength={200}
                  placeholder="Titre de l'événement (max 200 caractères)"
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-2">
                  Description
                </label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  maxLength={5000}
                  placeholder="Description de l'événement (max 5000 caractères)"
                />
              </div>
              <div>
                <label htmlFor="eventDate" className="block text-sm font-medium mb-2">
                  Date de l'événement
                </label>
                <Input
                  id="eventDate"
                  type="datetime-local"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="media" className="block text-sm font-medium mb-2">
                  Photos et vidéos
                </label>
                <Input
                  id="media"
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  onChange={(e) => setSelectedFiles(e.target.files)}
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-sage to-gold"
                disabled={submitting}
              >
                <Upload className="w-4 h-4 mr-2" />
                {submitting ? 'Publication...' : 'Publier l\'événement'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-sage">Événements publiés</h2>
          {events.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                Aucun événement publié pour le moment.
              </CardContent>
            </Card>
          ) : (
            events.map((event) => (
              <Card key={event.id}>
                <CardContent className="py-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-sage mb-2">{event.title}</h3>
                      <p className="text-muted-foreground mb-2">{event.description}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {new Date(event.event_date).toLocaleDateString('fr-FR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(event.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
