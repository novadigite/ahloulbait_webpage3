-- Create table for fatwa audios to support multiple audio files per fatwa
CREATE TABLE IF NOT EXISTS public.fatwa_audios (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  fatwa_id UUID NOT NULL REFERENCES public.fatwas(id) ON DELETE CASCADE,
  audio_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.fatwa_audios ENABLE ROW LEVEL SECURITY;

-- Create policies for fatwa_audios
CREATE POLICY "Fatwa audios are viewable by admins"
ON public.fatwa_audios
FOR SELECT
USING (is_admin());

CREATE POLICY "Only admins can insert fatwa audios"
ON public.fatwa_audios
FOR INSERT
WITH CHECK (is_admin());

CREATE POLICY "Only admins can delete fatwa audios"
ON public.fatwa_audios
FOR DELETE
USING (is_admin());

-- Create index for better performance
CREATE INDEX idx_fatwa_audios_fatwa_id ON public.fatwa_audios(fatwa_id);