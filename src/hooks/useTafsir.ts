import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Tafsir {
  id: string;
  title: string;
  description: string | null;
  surah_name: string;
  surah_number: number;
  content: string | null;
  video_url: string | null;
  created_at: string;
}

export const useTafsir = () => {
  return useQuery({
    queryKey: ['tafsir'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tafsir')
        .select('*')
        .order('surah_number', { ascending: true });
      
      if (error) throw error;
      return data as Tafsir[];
    },
  });
};

export const useDeleteTafsir = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (tafsirId: string) => {
      const { error } = await supabase
        .from('tafsir')
        .delete()
        .eq('id', tafsirId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tafsir'] });
    },
  });
};
