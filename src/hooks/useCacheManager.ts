import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

const CACHE_VERSION = '1.0.0';
const CACHE_VERSION_KEY = 'app_cache_version';
const LAST_CACHE_CLEAR_KEY = 'last_cache_clear';
const CACHE_CLEAR_INTERVAL = 7 * 24 * 60 * 60 * 1000; // 7 days

export const useCacheManager = () => {
  const { toast } = useToast();

  const clearAppCache = async () => {
    try {
      // Clear localStorage except auth data
      const authKeys = ['supabase.auth.token', 'sb-supabase-auth-token'];
      const preservedData: { [key: string]: string | null } = {};
      
      authKeys.forEach(key => {
        preservedData[key] = localStorage.getItem(key);
      });

      localStorage.clear();

      // Restore auth data
      Object.entries(preservedData).forEach(([key, value]) => {
        if (value) {
          localStorage.setItem(key, value);
        }
      });

      // Clear sessionStorage
      sessionStorage.clear();

      // Clear service worker caches if available
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        await Promise.all(
          cacheNames.map(cacheName => caches.delete(cacheName))
        );
      }

      // Update cache clear timestamp
      localStorage.setItem(LAST_CACHE_CLEAR_KEY, Date.now().toString());
      localStorage.setItem(CACHE_VERSION_KEY, CACHE_VERSION);

      return true;
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Error clearing cache:', error);
      }
      return false;
    }
  };

  const checkCacheVersion = async () => {
    const storedVersion = localStorage.getItem(CACHE_VERSION_KEY);
    
    if (storedVersion !== CACHE_VERSION) {
      await clearAppCache();
      toast({
        title: "Mise à jour effectuée",
        description: "L'application a été mise à jour avec les dernières fonctionnalités.",
      });
    }
  };

  const checkScheduledCacheClear = async () => {
    const lastClear = localStorage.getItem(LAST_CACHE_CLEAR_KEY);
    
    if (!lastClear) {
      await clearAppCache();
      return;
    }

    const timeSinceLastClear = Date.now() - parseInt(lastClear);
    
    if (timeSinceLastClear >= CACHE_CLEAR_INTERVAL) {
      await clearAppCache();
      toast({
        title: "Cache nettoyé",
        description: "Le cache a été nettoyé pour optimiser les performances.",
      });
    }
  };

  useEffect(() => {
    checkCacheVersion();
    checkScheduledCacheClear();
  }, []);

  return {
    clearAppCache,
    getCacheVersion: () => CACHE_VERSION,
  };
};
