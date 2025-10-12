import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Fatwa {
  id: string;
  question: string;
  questioner_name: string | null;
  audio_url: string;
  scholar_name: string | null;
  category: string | null;
  created_at: string;
}

export const useFatwas = () => {
  return useQuery({
    queryKey: ['fatwas'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('fatwas')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Fatwa[];
    },
  });
};

export const useDeleteFatwa = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (fatwaId: string) => {
      const { error } = await supabase
        .from('fatwas')
        .delete()
        .eq('id', fatwaId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fatwas'] });
    },
  });
};
