-- Trigger types regeneration
-- This migration adds a comment to ensure types are updated

COMMENT ON TABLE public.events IS 'Stores community events and activities';
COMMENT ON TABLE public.tafsir IS 'Stores Quranic commentary and interpretations';
COMMENT ON TABLE public.sira IS 'Stores Prophet biography videos and content';
COMMENT ON TABLE public.fatwas IS 'Stores religious rulings and Q&A';
COMMENT ON TABLE public.event_media IS 'Stores media files associated with events';
