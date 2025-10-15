import { Card, CardContent } from "@/components/ui/card";
import { Clock, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";

const PrayerTimes = () => {
  const { t } = useTranslation();
  
  const prayers = [
    { name: t('prayerTimes.fajr'), time: "05:30" },
    { name: t('prayerTimes.dhuhr'), time: "13:30" },
    { name: t('prayerTimes.asr'), time: "16:00" },
    { name: t('prayerTimes.maghrib'), time: "18:30" },
    { name: t('prayerTimes.isha'), time: "19:30" },
  ];

  return (
    <Card className="border-0 bg-white/90 backdrop-blur-sm shadow-xl">
      <CardContent className="p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-sage to-gold rounded-xl flex items-center justify-center">
            <Clock className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-sage">{t('prayerTimes.title')}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{t('prayerTimes.location')}</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {prayers.map((prayer, index) => (
            <div
              key={prayer.name}
              className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-sage-light/20 to-gold-light/20 hover:from-sage-light/30 hover:to-gold-light/30 transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <span className="font-medium text-sage">{prayer.name}</span>
              <span className="text-2xl font-bold text-gold font-mono">{prayer.time}</span>
            </div>
          ))}
        </div>

        <p className="text-xs text-muted-foreground mt-6 text-center">
          {t('prayerTimes.note')}
        </p>
      </CardContent>
    </Card>
  );
};

export default PrayerTimes;
