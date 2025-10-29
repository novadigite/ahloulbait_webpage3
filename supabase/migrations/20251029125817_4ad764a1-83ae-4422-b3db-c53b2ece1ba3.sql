-- Rendre les champs sourate optionnels dans la table tafsir
ALTER TABLE public.tafsir 
ALTER COLUMN surah_name DROP NOT NULL,
ALTER COLUMN surah_number DROP NOT NULL;