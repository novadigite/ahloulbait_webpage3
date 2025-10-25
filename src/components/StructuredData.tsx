import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const StructuredData = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    // Organization Schema
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "ReligiousOrganization",
      "name": "AHLOUL BAIT INTERNATIONAL",
      "alternateName": "Communauté Tidjaniya Côte d'Ivoire",
      "url": window.location.origin,
      "logo": "https://storage.googleapis.com/gpt-engineer-file-uploads/P5ZnuRivL9N1sLH9PFi7UvasXo33/uploads/1757765450374-vitrine2.jpg",
      "description": t('hero.description'),
      "foundingDate": "2010",
      "foundingLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Abidjan",
          "addressCountry": "CI"
        }
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Yopougon, Ananeraie 1",
        "addressLocality": "Abidjan",
        "addressCountry": "CI"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+225-0757875302",
        "contactType": "customer service",
        "availableLanguage": ["fr", "en"]
      },
      "founder": {
        "@type": "Person",
        "name": "Cheikh Ahmad Tidjani Diabaté",
        "jobTitle": t('leadership.spiritualGuide'),
        "description": t('leadership.bio.paragraph1')
      },
      "sameAs": [
        "https://www.facebook.com/CheikhAhmadTidjaneDiabate1199/",
        "https://m.youtube.com/@cheikhahmadtidjanydiabatea219",
        "https://www.tiktok.com/@cheikhahmadtidjane1"
      ]
    };

    // FAQ Schema
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": t('faq.questions.join.q'),
          "acceptedAnswer": {
            "@type": "Answer",
            "text": t('faq.questions.join.a')
          }
        },
        {
          "@type": "Question",
          "name": t('faq.questions.activities.q'),
          "acceptedAnswer": {
            "@type": "Answer",
            "text": t('faq.questions.activities.a')
          }
        },
        {
          "@type": "Question",
          "name": t('faq.questions.donations.q'),
          "acceptedAnswer": {
            "@type": "Answer",
            "text": t('faq.questions.donations.a')
          }
        },
        {
          "@type": "Question",
          "name": t('faq.questions.prayers.q'),
          "acceptedAnswer": {
            "@type": "Answer",
            "text": t('faq.questions.prayers.a')
          }
        },
        {
          "@type": "Question",
          "name": t('faq.questions.tidjaniya.q'),
          "acceptedAnswer": {
            "@type": "Answer",
            "text": t('faq.questions.tidjaniya.a')
          }
        }
      ]
    };

    // Person Schema (Spiritual Guide)
    const personSchema = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Cheikh Ahmad Tidjani Diabaté",
      "jobTitle": t('leadership.spiritualGuide'),
      "affiliation": {
        "@type": "Organization",
        "name": "AHLOUL BAIT INTERNATIONAL"
      },
      "description": t('leadership.bio.paragraph1'),
      "knowsAbout": ["Islam", "Tidjaniya", "Spiritualité", "Guidance spirituelle"],
      "sameAs": [
        "https://www.facebook.com/CheikhAhmadTidjaneDiabate1199/",
        "https://m.youtube.com/@cheikhahmadtidjanydiabatea219",
        "https://www.tiktok.com/@cheikhahmadtidjane1"
      ]
    };

    // Insert or update schemas
    const updateSchema = (id: string, schema: any) => {
      let script = document.getElementById(id) as HTMLScriptElement | null;
      if (!script) {
        script = document.createElement('script');
        script.id = id;
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(schema);
    };

    updateSchema('schema-organization', organizationSchema);
    updateSchema('schema-faq', faqSchema);
    updateSchema('schema-person', personSchema);

    // Update HTML lang attribute
    document.documentElement.lang = i18n.language;

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', window.location.href);

  }, [t, i18n.language]);

  return null;
};

export default StructuredData;
