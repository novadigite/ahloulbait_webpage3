-- Create table for Tafsir content
CREATE TABLE public.tafsir (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  surah_name TEXT NOT NULL,
  surah_number INTEGER NOT NULL,
  content TEXT,
  video_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID NOT NULL
);

-- Enable RLS for tafsir
ALTER TABLE public.tafsir ENABLE ROW LEVEL SECURITY;

-- Tafsir policies
CREATE POLICY "Tafsir is viewable by everyone" 
ON public.tafsir 
FOR SELECT 
USING (true);

CREATE POLICY "Only admins can insert tafsir" 
ON public.tafsir 
FOR INSERT 
WITH CHECK (is_admin());

CREATE POLICY "Only admins can update tafsir" 
ON public.tafsir 
FOR UPDATE 
USING (is_admin());

CREATE POLICY "Only admins can delete tafsir" 
ON public.tafsir 
FOR DELETE 
USING (is_admin());

-- Create table for Sira content
CREATE TABLE public.sira (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  video_url TEXT NOT NULL,
  thumbnail_url TEXT,
  duration TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID NOT NULL
);

-- Enable RLS for sira
ALTER TABLE public.sira ENABLE ROW LEVEL SECURITY;

-- Sira policies
CREATE POLICY "Sira is viewable by everyone" 
ON public.sira 
FOR SELECT 
USING (true);

CREATE POLICY "Only admins can insert sira" 
ON public.sira 
FOR INSERT 
WITH CHECK (is_admin());

CREATE POLICY "Only admins can update sira" 
ON public.sira 
FOR UPDATE 
USING (is_admin());

CREATE POLICY "Only admins can delete sira" 
ON public.sira 
FOR DELETE 
USING (is_admin());

-- Create table for Fatwas
CREATE TABLE public.fatwas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  questioner_name TEXT,
  audio_url TEXT NOT NULL,
  scholar_name TEXT,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID NOT NULL
);

-- Enable RLS for fatwas
ALTER TABLE public.fatwas ENABLE ROW LEVEL SECURITY;

-- Fatwas policies
CREATE POLICY "Fatwas is viewable by everyone" 
ON public.fatwas 
FOR SELECT 
USING (true);

CREATE POLICY "Only admins can insert fatwas" 
ON public.fatwas 
FOR INSERT 
WITH CHECK (is_admin());

CREATE POLICY "Only admins can update fatwas" 
ON public.fatwas 
FOR UPDATE 
USING (is_admin());

CREATE POLICY "Only admins can delete fatwas" 
ON public.fatwas 
FOR DELETE 
USING (is_admin());