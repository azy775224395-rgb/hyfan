
import React from 'react';

const LocalBusinessSchema: React.FC = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "حيفان للطاقة المتجددة",
    "image": "https://i.postimg.cc/50g6cG2T/IMG-20260201-232332.jpg",
    "logo": "https://i.postimg.cc/50g6cG2T/IMG-20260201-232332.jpg",
    "url": "https://hyfn-czzv.onrender.com/",
    "telephone": "+967784400333",
    "priceRange": "$$",
    "description": "شركة رائدة في مجال الطاقة الشمسية في اليمن، توفر ألواح طاقة شمسية، بطاريات جل، انفرترات، وأجهزة منزلية موفرة للطاقة مع شحن لجميع المحافظات.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "شارع تعز",
      "addressLocality": "صنعاء",
      "addressRegion": "أمانة العاصمة",
      "postalCode": "00967",
      "addressCountry": "YE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 15.3694,
      "longitude": 44.1910
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Saturday",
        "Sunday"
      ],
      "opens": "08:00",
      "closes": "21:00"
    },
    "areaServed": [
      { "@type": "City", "name": "Sana'a" },
      { "@type": "City", "name": "Aden" },
      { "@type": "City", "name": "Taiz" },
      { "@type": "City", "name": "Ibb" },
      { "@type": "City", "name": "Hodeidah" },
      { "@type": "Country", "name": "Yemen" }
    ],
    "sameAs": [
      "https://www.facebook.com/profile.php?id=61577192150477",
      "https://www.instagram.com/moose.3433085?igsh=MnZ0bGN2NWJ2OHBx"
    ],
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://hyfn-czzv.onrender.com/#/?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default LocalBusinessSchema;
