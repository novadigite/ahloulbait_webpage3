import { useState, useEffect } from 'react';

interface PrayerTime {
  name: string;
  time: string;
}

interface PrayerTimesData {
  prayers: PrayerTime[];
  location: string;
  isLoading: boolean;
  error: string | null;
}

export const usePrayerTimes = (t: (key: string) => string): PrayerTimesData => {
  const [prayers, setPrayers] = useState<PrayerTime[]>([]);
  const [location, setLocation] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrayerTimes = async (latitude: number, longitude: number) => {
      try {
        const response = await fetch(
          `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=2`
        );
        const data = await response.json();
        
        if (data.code === 200) {
          const timings = data.data.timings;
          setPrayers([
            { name: t('prayerTimes.fajr'), time: timings.Fajr },
            { name: t('prayerTimes.dhuhr'), time: timings.Dhuhr },
            { name: t('prayerTimes.asr'), time: timings.Asr },
            { name: t('prayerTimes.maghrib'), time: timings.Maghrib },
            { name: t('prayerTimes.isha'), time: timings.Isha },
          ]);
          
          // Get location name from response
          const city = data.data.meta.timezone || 'Votre localisation';
          setLocation(city);
        }
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching prayer times:', err);
        setError('Unable to fetch prayer times');
        // Fallback to default times
        setPrayers([
          { name: t('prayerTimes.fajr'), time: "05:30" },
          { name: t('prayerTimes.dhuhr'), time: "13:30" },
          { name: t('prayerTimes.asr'), time: "16:00" },
          { name: t('prayerTimes.maghrib'), time: "18:30" },
          { name: t('prayerTimes.isha'), time: "19:30" },
        ]);
        setLocation(t('prayerTimes.location'));
        setIsLoading(false);
      }
    };

    const getLocationAndFetchTimes = () => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            fetchPrayerTimes(position.coords.latitude, position.coords.longitude);
          },
          (err) => {
            console.error('Geolocation error:', err);
            // Default to Côte d'Ivoire (Abidjan) coordinates
            fetchPrayerTimes(5.3600, -4.0083);
          }
        );
      } else {
        // Default to Côte d'Ivoire (Abidjan) coordinates
        fetchPrayerTimes(5.3600, -4.0083);
      }
    };

    getLocationAndFetchTimes();
  }, [t]);

  return { prayers, location, isLoading, error };
};
