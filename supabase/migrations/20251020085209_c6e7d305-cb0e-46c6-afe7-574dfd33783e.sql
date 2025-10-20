-- Step 1: Make created_by columns nullable to allow orphaned content preservation
ALTER TABLE public.tafsir ALTER COLUMN created_by DROP NOT NULL;
ALTER TABLE public.sira ALTER COLUMN created_by DROP NOT NULL;
ALTER TABLE public.fatwas ALTER COLUMN created_by DROP NOT NULL;

-- Step 2: Set orphaned references to NULL
UPDATE public.tafsir
SET created_by = NULL
WHERE created_by NOT IN (SELECT id FROM public.profiles);

UPDATE public.sira
SET created_by = NULL
WHERE created_by NOT IN (SELECT id FROM public.profiles);

UPDATE public.fatwas
SET created_by = NULL
WHERE created_by NOT IN (SELECT id FROM public.profiles);

-- Step 3: Add foreign key constraints with SET NULL to preserve content when creator is deleted
ALTER TABLE public.tafsir
ADD CONSTRAINT tafsir_created_by_fkey
FOREIGN KEY (created_by)
REFERENCES public.profiles(id)
ON DELETE SET NULL;

ALTER TABLE public.sira
ADD CONSTRAINT sira_created_by_fkey
FOREIGN KEY (created_by)
REFERENCES public.profiles(id)
ON DELETE SET NULL;

ALTER TABLE public.fatwas
ADD CONSTRAINT fatwas_created_by_fkey
FOREIGN KEY (created_by)
REFERENCES public.profiles(id)
ON DELETE SET NULL;