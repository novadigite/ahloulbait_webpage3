import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Sira {
  id: string;
  title: string;
  description: string | null;
  video_url: string;
  thumbnail_url: string | null;
  duration: string | null;
  created_at: string;
}

export const useSira = () => {
  return useQuery({
    queryKey: ['sira'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('sira')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Sira[];
    },
  });
};

export const useDeleteSira = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (siraId: string) => {
      const { error } = await supabase
        .from('sira')
        .delete()
        .eq('id', siraId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sira'] });
    },
  });
};
