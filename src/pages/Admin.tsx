import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { LogOut, Plus, Trash2, Calendar, Upload } from 'lucide-react';
import { Session } from '@supabase/supabase-js';
import { useQueryClient } from '@tanstack/react-query';
import { 
  eventSchema, 
  tafsirSchema, 
  siraSchema, 
  fatwaSchema, 
  validateFile, 
  imageFileSchema, 
  audioFileSchema,
  videoFileSchema,
  youtubeUrlSchema,
  getSafeFileExtension
} from '@/lib/validation';
import { logAudit } from '@/lib/auditLog';
import TwoFactorAuth from '@/components/TwoFactorAuth';

type ContentType = 'event' | 'tafsir' | 'sira' | 'fatwa';

interface Event {
  id: string;
  title: string;
  description: string;
  event_date: string;
}

interface Tafsir {
  id: string;
  title: string;
  description: string;
  surah_name: string;
  surah_number: number;
  content: string;
  video_url: string;
}

interface Sira {
  id: string;
  title: string;
  description: string;
  video_url: string;
  thumbnail_url: string;
  duration: string;
}

interface Fatwa {
  id: string;
  question: string;
  audio_url: string;
  category: string;
  scholar_name: string;
  questioner_name: string;
}

const Admin = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [contentType, setContentType] = useState<ContentType>('event');
  
  // Events
  const [events, setEvents] = useState<Event[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [youtubeUrls, setYoutubeUrls] = useState('');
  
  // Tafsir
  const [tafsirs, setTafsirs] = useState<Tafsir[]>([]);
  const [surahName, setSurahName] = useState('');
  const [surahNumber, setSurahNumber] = useState('');
  const [tafsirContent, setTafsirContent] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  
  // Sira
  const [siras, setSiras] = useState<Sira[]>([]);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [duration, setDuration] = useState('');
  
  // Fatwa
  const [fatwas, setFatwas] = useState<Fatwa[]>([]);
  const [question, setQuestion] = useState('');
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [category, setCategory] = useState('');
  const [scholarName, setScholarName] = useState('');
  const [questionerName, setQuestionerName] = useState('');
  
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();

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
        loadAllContent();
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

  const loadAllContent = async () => {
    await Promise.all([
      loadEvents(),
      loadTafsirs(),
      loadSiras(),
      loadFatwas(),
    ]);
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
      if (import.meta.env.DEV) {
        console.error('Error loading events:', error);
      }
    }
  };

  const loadTafsirs = async () => {
    try {
      const { data, error } = await supabase
        .from('tafsir')
        .select('*')
        .order('surah_number', { ascending: true });

      if (error) throw error;
      setTafsirs(data || []);
    } catch (error: any) {
      if (import.meta.env.DEV) {
        console.error('Error loading tafsirs:', error);
      }
    }
  };

  const loadSiras = async () => {
    try {
      const { data, error } = await supabase
        .from('sira')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSiras(data || []);
    } catch (error: any) {
      if (import.meta.env.DEV) {
        console.error('Error loading siras:', error);
      }
    }
  };

  const loadFatwas = async () => {
    try {
      const { data, error } = await supabase
        .from('fatwas')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFatwas(data || []);
    } catch (error: any) {
      if (import.meta.env.DEV) {
        console.error('Error loading fatwas:', error);
      }
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) return;

    switch (contentType) {
      case 'event':
        await handleEventSubmit();
        break;
      case 'tafsir':
        await handleTafsirSubmit();
        break;
      case 'sira':
        await handleSiraSubmit();
        break;
      case 'fatwa':
        await handleFatwaSubmit();
        break;
    }
  };

  const handleEventSubmit = async () => {
    if (!session) return;

    // Validate event data
    const result = eventSchema.safeParse({
      title,
      description,
      event_date: eventDate,
    });

    if (!result.success) {
      const firstError = result.error.errors[0];
      toast({
        title: "Erreur de validation",
        description: firstError.message,
        variant: "destructive",
      });
      return;
    }

    // Validate files if present
    if (selectedFiles && selectedFiles.length > 0) {
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const isVideo = file.type.startsWith('video/');
        const schema = isVideo ? videoFileSchema : imageFileSchema;
        const fileValidation = validateFile(file, schema);

        if (!fileValidation.success) {
          const firstError = fileValidation.error.errors[0];
          toast({
            title: "Erreur de validation du fichier",
            description: `${file.name}: ${firstError.message}`,
            variant: "destructive",
          });
          return;
        }
      }
    }

    setSubmitting(true);

    try {
      const { data: eventData, error: eventError } = await supabase
        .from('events')
        .insert({
          title: result.data.title,
          description: result.data.description,
          event_date: result.data.event_date,
          created_by: session.user.id,
        })
        .select()
        .single();

      if (eventError) throw eventError;

      // Upload files from computer
      if (selectedFiles && selectedFiles.length > 0) {
        for (let i = 0; i < selectedFiles.length; i++) {
          const file = selectedFiles[i];
          const fileExt = getSafeFileExtension(file);
          const fileName = `${eventData.id}/${Date.now()}-${i}.${fileExt}`;
          const mediaType = file.type.startsWith('video/') ? 'video' : 'image';

          const { error: uploadError } = await supabase.storage
            .from('event-media')
            .upload(fileName, file);

          if (uploadError) throw uploadError;

          const { data: { publicUrl } } = supabase.storage
            .from('event-media')
            .getPublicUrl(fileName);

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

      // Add YouTube URLs
      if (youtubeUrls.trim()) {
        const urls = youtubeUrls.split('\n').map(url => url.trim()).filter(url => url.length > 0);
        
        for (const url of urls) {
          // Validate YouTube URL
          const validation = youtubeUrlSchema.safeParse(url);
          if (!validation.success) {
            throw new Error(`URL invalide: ${url} - ${validation.error.errors[0].message}`);
          }

          const { error: mediaError } = await supabase
            .from('event_media')
            .insert({
              event_id: eventData.id,
              media_url: validation.data,
              media_type: 'video',
            });

          if (mediaError) throw mediaError;
        }
      }

      toast({
        title: "Événement créé",
        description: "L'événement a été publié avec succès.",
      });

      setTitle('');
      setDescription('');
      setEventDate('');
      setSelectedFiles(null);
      setYoutubeUrls('');
      loadEvents();
      queryClient.invalidateQueries({ queryKey: ['events'] });
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

  const handleTafsirSubmit = async () => {
    if (!session) return;

    // Validate tafsir data
    const result = tafsirSchema.safeParse({
      title,
      description,
      surah_name: surahName,
      surah_number: parseInt(surahNumber) || 0,
      content: tafsirContent,
      video_url: videoUrl,
    });

    if (!result.success) {
      const firstError = result.error.errors[0];
      toast({
        title: "Erreur de validation",
        description: firstError.message,
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);

    try {
      const { error } = await supabase
        .from('tafsir')
        .insert({
          title: result.data.title,
          description: result.data.description,
          surah_name: result.data.surah_name,
          surah_number: result.data.surah_number,
          content: result.data.content,
          video_url: result.data.video_url || null,
          created_by: session.user.id,
        });

      if (error) throw error;

      toast({
        title: "Tafsir créé",
        description: "Le tafsir a été publié avec succès.",
      });

      setTitle('');
      setDescription('');
      setSurahName('');
      setSurahNumber('');
      setTafsirContent('');
      setVideoUrl('');
      loadTafsirs();
      queryClient.invalidateQueries({ queryKey: ['tafsir'] });
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

  const handleSiraSubmit = async () => {
    if (!session) return;

    // Validate sira data
    const result = siraSchema.safeParse({
      title,
      description,
      video_url: videoUrl,
      duration,
    });

    if (!result.success) {
      const firstError = result.error.errors[0];
      toast({
        title: "Erreur de validation",
        description: firstError.message,
        variant: "destructive",
      });
      return;
    }

    // Validate thumbnail file if present
    if (thumbnailFile) {
      const fileValidation = validateFile(thumbnailFile, imageFileSchema);
      if (!fileValidation.success) {
        const firstError = fileValidation.error.errors[0];
        toast({
          title: "Erreur de validation du fichier",
          description: `${thumbnailFile.name}: ${firstError.message}`,
          variant: "destructive",
        });
        return;
      }
    }

    setSubmitting(true);

    try {
      let thumbnailUrl = '';

      if (thumbnailFile) {
        const fileExt = getSafeFileExtension(thumbnailFile);
        const fileName = `sira/${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('event-media')
          .upload(fileName, thumbnailFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('event-media')
          .getPublicUrl(fileName);

        thumbnailUrl = publicUrl;
      }

      const { error } = await supabase
        .from('sira')
        .insert({
          title: result.data.title,
          description: result.data.description,
          video_url: result.data.video_url,
          thumbnail_url: thumbnailUrl,
          duration: result.data.duration,
          created_by: session.user.id,
        });

      if (error) throw error;

      toast({
        title: "Sira créée",
        description: "La vidéo de sira a été publiée avec succès.",
      });

      setTitle('');
      setDescription('');
      setVideoUrl('');
      setThumbnailFile(null);
      setDuration('');
      loadSiras();
      queryClient.invalidateQueries({ queryKey: ['sira'] });
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

  const handleFatwaSubmit = async () => {
    if (!session) return;

    // Validate fatwa data
    const result = fatwaSchema.safeParse({
      question,
      category,
      scholar_name: scholarName,
      questioner_name: questionerName,
    });

    if (!result.success) {
      const firstError = result.error.errors[0];
      toast({
        title: "Erreur de validation",
        description: firstError.message,
        variant: "destructive",
      });
      return;
    }

    // Validate audio file if present (required for fatwa)
    if (!audioFile) {
      toast({
        title: "Erreur de validation",
        description: "Le fichier audio est requis",
        variant: "destructive",
      });
      return;
    }

    const fileValidation = validateFile(audioFile, audioFileSchema);
    if (!fileValidation.success) {
      const firstError = fileValidation.error.errors[0];
      toast({
        title: "Erreur de validation du fichier",
        description: `${audioFile.name}: ${firstError.message}`,
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);

    try {
      let audioUrl = '';

      if (audioFile) {
        const fileExt = getSafeFileExtension(audioFile);
        const fileName = `fatwas/${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('event-media')
          .upload(fileName, audioFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('event-media')
          .getPublicUrl(fileName);

        audioUrl = publicUrl;
      }

      const { error } = await supabase
        .from('fatwas')
        .insert({
          question: result.data.question,
          audio_url: audioUrl,
          category: result.data.category,
          scholar_name: result.data.scholar_name,
          questioner_name: result.data.questioner_name,
          created_by: session.user.id,
        });

      if (error) throw error;

      toast({
        title: "Fatwa créée",
        description: "La fatwa a été publiée avec succès.",
      });

      setQuestion('');
      setAudioFile(null);
      setCategory('');
      setScholarName('');
      setQuestionerName('');
      loadFatwas();
      queryClient.invalidateQueries({ queryKey: ['fatwas'] });
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

  const handleDeleteEvent = async (eventId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) return;

    try {
      // Get event data before deletion for audit log
      const eventToDelete = events.find(e => e.id === eventId);

      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', eventId);

      if (error) throw error;

      // Log audit
      await logAudit({
        action: 'DELETE_EVENT',
        tableName: 'events',
        recordId: eventId,
        oldData: eventToDelete
      });

      toast({
        title: "Événement supprimé",
        description: "L'événement a été supprimé avec succès.",
      });

      loadEvents();
      queryClient.invalidateQueries({ queryKey: ['events'] });
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDeleteTafsir = async (tafsirId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce tafsir ?')) return;

    try {
      const tafsirToDelete = tafsirs.find(t => t.id === tafsirId);

      const { error } = await supabase
        .from('tafsir')
        .delete()
        .eq('id', tafsirId);

      if (error) throw error;

      await logAudit({
        action: 'DELETE_TAFSIR',
        tableName: 'tafsir',
        recordId: tafsirId,
        oldData: tafsirToDelete
      });

      toast({
        title: "Tafsir supprimé",
        description: "Le tafsir a été supprimé avec succès.",
      });

      loadTafsirs();
      queryClient.invalidateQueries({ queryKey: ['tafsir'] });
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDeleteSira = async (siraId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette sira ?')) return;

    try {
      const siraToDelete = siras.find(s => s.id === siraId);

      const { error } = await supabase
        .from('sira')
        .delete()
        .eq('id', siraId);

      if (error) throw error;

      await logAudit({
        action: 'DELETE_SIRA',
        tableName: 'sira',
        recordId: siraId,
        oldData: siraToDelete
      });

      toast({
        title: "Sira supprimée",
        description: "La sira a été supprimée avec succès.",
      });

      loadSiras();
      queryClient.invalidateQueries({ queryKey: ['sira'] });
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDeleteFatwa = async (fatwaId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette fatwa ?')) return;

    try {
      const fatwaToDelete = fatwas.find(f => f.id === fatwaId);

      const { error } = await supabase
        .from('fatwas')
        .delete()
        .eq('id', fatwaId);

      if (error) throw error;

      await logAudit({
        action: 'DELETE_FATWA',
        tableName: 'fatwas',
        recordId: fatwaId,
        oldData: fatwaToDelete
      });

      toast({
        title: "Fatwa supprimée",
        description: "La fatwa a été supprimée avec succès.",
      });

      loadFatwas();
      queryClient.invalidateQueries({ queryKey: ['fatwas'] });
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

  const renderForm = () => {
    switch (contentType) {
      case 'event':
        return (
          <>
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-2">
                Titre
              </label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Titre de l'événement"
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
                placeholder="Description de l'événement"
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
                <Upload className="inline w-4 h-4 mr-2" />
                Uploader des fichiers (photos/vidéos)
              </label>
              <Input
                id="media"
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={(e) => setSelectedFiles(e.target.files)}
                className="cursor-pointer"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Sélectionnez plusieurs fichiers depuis votre ordinateur
              </p>
            </div>
            <div>
              <label htmlFor="youtubeUrls" className="block text-sm font-medium mb-2">
                Liens YouTube (optionnel)
              </label>
              <Textarea
                id="youtubeUrls"
                value={youtubeUrls}
                onChange={(e) => setYoutubeUrls(e.target.value)}
                rows={3}
                placeholder="https://www.youtube.com/watch?v=...&#10;https://www.youtube.com/watch?v=...&#10;(Un lien par ligne)"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Collez les liens YouTube, un par ligne
              </p>
            </div>
          </>
        );

      case 'tafsir':
        return (
          <>
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-2">
                Titre
              </label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Titre du tafsir"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="surahName" className="block text-sm font-medium mb-2">
                  Nom de la sourate
                </label>
                <Input
                  id="surahName"
                  value={surahName}
                  onChange={(e) => setSurahName(e.target.value)}
                  required
                  placeholder="Al-Fatiha"
                />
              </div>
              <div>
                <label htmlFor="surahNumber" className="block text-sm font-medium mb-2">
                  Numéro de la sourate
                </label>
                <Input
                  id="surahNumber"
                  type="number"
                  value={surahNumber}
                  onChange={(e) => setSurahNumber(e.target.value)}
                  required
                  placeholder="1"
                />
              </div>
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-2">
                Description
              </label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Courte description"
              />
            </div>
            <div>
              <label htmlFor="tafsirContent" className="block text-sm font-medium mb-2">
                Contenu du tafsir
              </label>
              <Textarea
                id="tafsirContent"
                value={tafsirContent}
                onChange={(e) => setTafsirContent(e.target.value)}
                rows={6}
                placeholder="Contenu détaillé du tafsir"
              />
            </div>
            <div>
              <label htmlFor="videoUrl" className="block text-sm font-medium mb-2">
                URL de la vidéo (optionnel)
              </label>
              <Input
                id="videoUrl"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://youtube.com/..."
              />
            </div>
          </>
        );

      case 'sira':
        return (
          <>
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-2">
                Titre
              </label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Titre de la vidéo de sira"
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
                placeholder="Description de la vidéo"
              />
            </div>
            <div>
              <label htmlFor="videoUrl" className="block text-sm font-medium mb-2">
                URL de la vidéo
              </label>
              <Input
                id="videoUrl"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                required
                placeholder="https://youtube.com/..."
              />
            </div>
            <div>
              <label htmlFor="thumbnail" className="block text-sm font-medium mb-2">
                Image miniature
              </label>
              <Input
                id="thumbnail"
                type="file"
                accept="image/*"
                onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
              />
            </div>
            <div>
              <label htmlFor="duration" className="block text-sm font-medium mb-2">
                Durée (optionnel)
              </label>
              <Input
                id="duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="ex: 45:30"
              />
            </div>
          </>
        );

      case 'fatwa':
        return (
          <>
            <div>
              <label htmlFor="question" className="block text-sm font-medium mb-2">
                Question
              </label>
              <Textarea
                id="question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                required
                rows={4}
                placeholder="La question posée"
              />
            </div>
            <div>
              <label htmlFor="audioFile" className="block text-sm font-medium mb-2">
                Fichier audio de la réponse
              </label>
              <Input
                id="audioFile"
                type="file"
                accept="audio/*"
                onChange={(e) => setAudioFile(e.target.files?.[0] || null)}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="category" className="block text-sm font-medium mb-2">
                  Catégorie
                </label>
                <Input
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Prière, Jeûne, etc."
                />
              </div>
              <div>
                <label htmlFor="questionerName" className="block text-sm font-medium mb-2">
                  Nom du questionneur
                </label>
                <Input
                  id="questionerName"
                  value={questionerName}
                  onChange={(e) => setQuestionerName(e.target.value)}
                  placeholder="Nom (optionnel)"
                />
              </div>
            </div>
            <div>
              <label htmlFor="scholarName" className="block text-sm font-medium mb-2">
                Nom du savant
              </label>
              <Input
                id="scholarName"
                value={scholarName}
                onChange={(e) => setScholarName(e.target.value)}
                placeholder="Nom du savant qui répond"
              />
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-spiritual p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-sage">Administration du contenu</h1>
          <Button onClick={handleSignOut} variant="outline">
            <LogOut className="w-4 h-4 mr-2" />
            Déconnexion
          </Button>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Créer un nouveau contenu
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="contentType" className="block text-sm font-medium mb-2">
                  Type de contenu
                </label>
                <Select value={contentType} onValueChange={(value: ContentType) => setContentType(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="event">Événement</SelectItem>
                    <SelectItem value="tafsir">Tafsir du Coran</SelectItem>
                    <SelectItem value="sira">Sira du Prophète</SelectItem>
                    <SelectItem value="fatwa">Fatwa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {renderForm()}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-sage to-gold"
                disabled={submitting}
              >
                <Upload className="w-4 h-4 mr-2" />
                {submitting ? 'Publication...' : 'Publier'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Tabs defaultValue="events" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="events">Événements</TabsTrigger>
            <TabsTrigger value="tafsirs">Tafsirs</TabsTrigger>
            <TabsTrigger value="siras">Siras</TabsTrigger>
            <TabsTrigger value="fatwas">Fatwas</TabsTrigger>
            <TabsTrigger value="security">Sécurité</TabsTrigger>
          </TabsList>

          <TabsContent value="events">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-sage">Événements publiés</h2>
              {events.length === 0 ? (
                <Card>
                  <CardContent className="py-8 text-center text-muted-foreground">
                    Aucun événement publié.
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
                          onClick={() => handleDeleteEvent(event.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="tafsirs">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-sage">Tafsirs publiés</h2>
              {tafsirs.length === 0 ? (
                <Card>
                  <CardContent className="py-8 text-center text-muted-foreground">
                    Aucun tafsir publié.
                  </CardContent>
                </Card>
              ) : (
                tafsirs.map((tafsir) => (
                  <Card key={tafsir.id}>
                    <CardContent className="py-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-sage mb-2">{tafsir.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            Sourate {tafsir.surah_number}: {tafsir.surah_name}
                          </p>
                          <p className="text-muted-foreground">{tafsir.description}</p>
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteTafsir(tafsir.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="siras">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-sage">Siras publiées</h2>
              {siras.length === 0 ? (
                <Card>
                  <CardContent className="py-8 text-center text-muted-foreground">
                    Aucune sira publiée.
                  </CardContent>
                </Card>
              ) : (
                siras.map((sira) => (
                  <Card key={sira.id}>
                    <CardContent className="py-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-sage mb-2">{sira.title}</h3>
                          <p className="text-muted-foreground mb-2">{sira.description}</p>
                          {sira.duration && (
                            <p className="text-sm text-muted-foreground">Durée: {sira.duration}</p>
                          )}
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteSira(sira.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="fatwas">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-sage">Fatwas publiées</h2>
              {fatwas.length === 0 ? (
                <Card>
                  <CardContent className="py-8 text-center text-muted-foreground">
                    Aucune fatwa publiée.
                  </CardContent>
                </Card>
              ) : (
                fatwas.map((fatwa) => (
                  <Card key={fatwa.id}>
                    <CardContent className="py-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-sage mb-2">{fatwa.question}</h3>
                          <div className="flex gap-4 text-sm text-muted-foreground">
                            {fatwa.category && <span>Catégorie: {fatwa.category}</span>}
                            {fatwa.scholar_name && <span>Savant: {fatwa.scholar_name}</span>}
                          </div>
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteFatwa(fatwa.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="security">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-sage">Paramètres de Sécurité</h2>
              <TwoFactorAuth />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
