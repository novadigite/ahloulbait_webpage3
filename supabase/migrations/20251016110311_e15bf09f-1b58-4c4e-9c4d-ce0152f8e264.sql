-- Mettre à jour toutes les URLs vidéo pour utiliser HTTPS au lieu de HTTP
UPDATE tafsir 
SET video_url = REPLACE(video_url, 'http://', 'https://') 
WHERE video_url LIKE 'http://%';