import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Event {
  id: string;
  title: string;
  description: string | null;
  event_date: string;
  created_at: string;
}

export interface EventMedia {
  id: string;
  event_id: string;
  media_url: string;
  media_type: string;
}

export const useEvents = () => {
  return useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('event_date', { ascending: false });
      
      if (error) throw error;
      return data as Event[];
    },
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useEventMedia = (eventId: string) => {
  return useQuery({
    queryKey: ['event-media', eventId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('event_media')
        .select('*')
        .eq('event_id', eventId);
      
      if (error) throw error;
      return data as EventMedia[];
    },
  });
};

export const useDeleteEvent = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (eventId: string) => {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', eventId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });
};
